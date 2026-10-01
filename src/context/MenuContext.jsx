import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialData';
import { getAccessToken } from '../lib/supabaseClient';

const MenuContext = createContext();

const SAMPLE_ORDERS = [];

export const normalizeArabic = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/[ًٌٍَُِّْ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ');
};

const normalizeProductRow = (row) => ({
  id: row.id,
  category_id: row.category_id,
  name: row.name,
  price: Number(row.price) || 0,
  description: row.description || '',
  image: row.image || '',
  is_available: row.is_available ?? true,
  is_popular: row.is_popular ?? false,
  order: row.order_index ?? row.order ?? 0
});

const normalizeCategoryRow = (row) => ({
  id: row.id,
  name_ar: row.name_ar,
  name_en: row.name_en || row.name_ar,
  icon: row.icon || 'UtensilsCrossed',
  order: row.order_index ?? row.order ?? 0
});

const getInitialData = () => {
  try {
    const savedCats = localStorage.getItem('qasr_mandi_categories');
    const savedProds = localStorage.getItem('qasr_mandi_products');
    return {
      categories: savedCats ? JSON.parse(savedCats) : INITIAL_CATEGORIES,
      products: savedProds ? JSON.parse(savedProds) : INITIAL_PRODUCTS
    };
  } catch (e) {
    return { categories: INITIAL_CATEGORIES, products: INITIAL_PRODUCTS };
  }
};

const apiWrite = async (path, method, body) => {
  const headers = { 'Content-Type': 'application/json' };
  const token = await getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    // API not available (e.g. local dev without Vercel functions) -> local-only mode
    return { ok: false, data: { fallback: true } };
  }
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
};

export const MenuProvider = ({ children }) => {
  const initial = getInitialData();
  const [categories, setCategories] = useState(initial.categories);
  const [products, setProducts] = useState(initial.products);

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('qasr_mandi_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch (e) {
      return SAMPLE_ORDERS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load menu from Supabase-backed API (DB is the source of truth).
  // Falls back to localStorage cache when the API is unavailable.
  const loadFromApi = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (
        prodData &&
        prodData.success &&
        Array.isArray(prodData.products) &&
        prodData.products.length > 0 &&
        catData &&
        catData.success &&
        Array.isArray(catData.categories) &&
        catData.categories.length > 0
      ) {
        setProducts(prodData.products.map(normalizeProductRow));
        setCategories(catData.categories.map(normalizeCategoryRow));
        return true;
      }
    } catch (e) {
      // Network/API failure: keep localStorage cache
    }
    return false;
  };

  useEffect(() => {
    loadFromApi();
  }, []);

  // Persist categories (cache for offline/fallback)
  useEffect(() => {
    try {
      localStorage.setItem('qasr_mandi_categories', JSON.stringify(categories));
    } catch (e) {}
  }, [categories]);

  // Persist products (cache for offline/fallback)
  useEffect(() => {
    try {
      localStorage.setItem('qasr_mandi_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('qasr_mandi_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Orders Management
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'ord_' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: 'completed'
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Async push to serverless API if live (public endpoint, no auth)
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const clearOrdersHistory = () => {
    setOrders([]);
    try {
      localStorage.removeItem('qasr_mandi_orders');
    } catch (e) {}
    fetch('/api/orders', { method: 'DELETE' }).catch(() => {});
  };

  // Product CRUD (server-first: changes apply for every visitor)
  const addProduct = async (newProduct) => {
    const payload = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      is_available: newProduct.is_available !== undefined ? newProduct.is_available : true,
      order: products.length + 1
    };

    try {
      const { ok, data } = await apiWrite('/api/products', 'POST', payload);

      if (data && data.fallback) {
        setProducts((prev) => [payload, ...prev]);
        return payload;
      }
      if (ok && data && data.product) {
        const saved = normalizeProductRow(data.product);
        setProducts((prev) => [saved, ...prev]);
        return saved;
      }
      alert((data && data.error) || 'تعذر حفظ المنتج في قاعدة البيانات');
      return null;
    } catch (e) {
      alert('تعذر الاتصال بالسيرفر أثناء حفظ المنتج');
      return null;
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const { ok, data } = await apiWrite('/api/products', 'PUT', { id, ...updatedFields });

      if (data && data.fallback) {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
        return true;
      }
      if (ok && data && data.product) {
        const saved = normalizeProductRow(data.product);
        setProducts((prev) => prev.map((p) => (p.id === id ? saved : p)));
        return true;
      }
      alert((data && data.error) || 'تعذر تحديث المنتج في قاعدة البيانات');
      return false;
    } catch (e) {
      alert('تعذر الاتصال بالسيرفر أثناء تحديث المنتج');
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { ok, data } = await apiWrite('/api/products', 'DELETE', { id });

      if (data && data.fallback) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
      if (ok && data && data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
      alert((data && data.error) || 'تعذر حذف المنتج من قاعدة البيانات');
      return false;
    } catch (e) {
      alert('تعذر الاتصال بالسيرفر أثناء حذف المنتج');
      return false;
    }
  };

  const toggleAvailability = async (id) => {
    const current = products.find((p) => p.id === id);
    if (!current) return;
    const nextValue = !current.is_available;

    // Optimistic UI update, revert on failure
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: nextValue } : p))
    );

    try {
      const { ok, data } = await apiWrite('/api/products', 'PUT', {
        id,
        is_available: nextValue
      });
      if (data && data.fallback) return;
      if (ok && data && data.success) return;
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_available: !nextValue } : p))
      );
      alert((data && data.error) || 'تعذر تحديث حالة المنتج');
    } catch (e) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_available: !nextValue } : p))
      );
      alert('تعذر الاتصال بالسيرفر أثناء تحديث حالة المنتج');
    }
  };

  // Category CRUD (synced so new categories are visible to all visitors)
  const addCategory = async (newCat) => {
    const payload = {
      ...newCat,
      id: 'cat_' + Date.now(),
      order: categories.length + 1
    };

    try {
      const { ok, data } = await apiWrite('/api/categories', 'POST', payload);

      if (data && data.fallback) {
        setCategories((prev) => [...prev, payload]);
        return payload;
      }
      if (ok && data && data.category) {
        const saved = normalizeCategoryRow(data.category);
        setCategories((prev) => [...prev, saved]);
        return saved;
      }
      alert((data && data.error) || 'تعذر حفظ القسم في قاعدة البيانات');
      return null;
    } catch (e) {
      alert('تعذر الاتصال بالسيرفر أثناء حفظ القسم');
      return null;
    }
  };

  const updateCategory = async (id, updatedFields) => {
    try {
      const { ok, data } = await apiWrite('/api/categories', 'PUT', { id, ...updatedFields });

      if (data && data.fallback) {
        setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c)));
        return true;
      }
      if (ok && data && data.category) {
        const saved = normalizeCategoryRow(data.category);
        setCategories((prev) => prev.map((c) => (c.id === id ? saved : c)));
        return true;
      }
      alert((data && data.error) || 'تعذر تحديث القسم في قاعدة البيانات');
      return false;
    } catch (e) {
      alert('تعذر الاتصال بالسيرفر أثناء تحديث القسم');
      return false;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { ok, data } = await apiWrite('/api/categories', 'DELETE', { id });

      if (data && data.fallback) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setProducts((prev) => prev.filter((p) => p.category_id !== id));
        return true;
      }
      if (ok && data && data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        // DB deletes category products via ON DELETE CASCADE
        setProducts((prev) => prev.filter((p) => p.category_id !== id));
        return true;
      }
      alert((data && data.error) || 'تعذر حذف القسم من قاعدة البيانات');
      return false;
    } catch (e) {
      alert('تعذر الاتصال بالسيرفر أثناء حذف القسم');
      return false;
    }
  };

  const resetToDefaultData = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        const res = await fetch('/api/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ reset: true })
        });
        const data = await res.json().catch(() => ({}));
        if (data && data.success) {
          await loadFromApi();
          return;
        }
        if (data && data.error) {
          alert(data.error);
          return;
        }
        // No JSON response / DB not configured: fall through to local reset
      }
    } catch (e) {
      // Not configured: fall through to local reset
    }

    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setOrders(SAMPLE_ORDERS);
    try {
      localStorage.removeItem('qasr_mandi_categories');
      localStorage.removeItem('qasr_mandi_products');
      localStorage.removeItem('qasr_mandi_orders');
    } catch (e) {}
  };

  // Filter products safely with Arabic normalization
  const normalizedQuery = normalizeArabic(searchQuery);
  const filteredProducts = (products || []).filter((product) => {
    if (!product) return false;
    const matchesCategory =
      activeCategory === 'all' || product.category_id === activeCategory;
    const matchesSearch =
      !normalizedQuery ||
      normalizeArabic(product.name).includes(normalizedQuery) ||
      normalizeArabic(product.description).includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <MenuContext.Provider
      value={{
        categories,
        products,
        filteredProducts,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        clearOrdersHistory,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleAvailability,
        addCategory,
        updateCategory,
        deleteCategory,
        resetToDefaultData
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
