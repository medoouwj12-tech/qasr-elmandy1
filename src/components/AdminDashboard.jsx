import React, { useState, useRef } from 'react';
import {
  X, ShieldCheck, Plus, Edit3, Trash2, Check, AlertCircle, RefreshCw,
  Search, Lock, Layers, Utensils, DollarSign, ToggleLeft, ToggleRight,
  TrendingUp, Calendar, ShoppingBag, Printer, FileSpreadsheet, CheckCircle2,
  Clock, MapPin, User, Phone, Upload, Camera, Image as ImageIcon, Link as LinkIcon, Sparkles
} from 'lucide-react';
import { useMenu } from '../context/MenuContext';

const PRESET_FOOD_IMAGES = [
  { label: 'دجاج مندي', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80' },
  { label: 'نصف دجاجة', url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80' },
  { label: 'لحم ضأن مندي', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { label: 'صينية بدوي', url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' },
  { label: 'مشويات وريش', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
  { label: 'كباب وكفتة', url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80' },
  { label: 'سندوتش كباب/تكة', url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80' },
  { label: 'عصير/شاي زرد', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { label: 'كنافة/حلا', url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80' }
];

const compressAndReadImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('يرجى اختيار ملف صورة صالحة (JPG, PNG, WEBP)'));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('تعذر معالجة الصورة'));
    };
    reader.onerror = () => reject(new Error('تعذر قراءة الملف'));
  });
};

export const AdminDashboard = ({ isOpen, onClose }) => {
  const {
    products,
    categories,
    orders,
    updateOrderStatus,
    deleteOrder,
    clearOrdersHistory,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    addCategory,
    deleteCategory,
    resetToDefaultData
  } = useMenu();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Sub-tab ('products' | 'categories' | 'sales')
  const [adminTab, setAdminTab] = useState('sales');
  const [filterCat, setFilterCat] = useState('all');
  const [adminSearch, setAdminSearch] = useState('');

  // Sales Filter State
  const [dateFilter, setDateFilter] = useState('today'); // 'today' | 'week' | 'all'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'table' | 'delivery'

  // Image Upload & Selection State
  const fileInputRef = useRef(null);
  const quickFileInputRef = useRef(null);
  const [quickUploadTargetId, setQuickUploadTargetId] = useState(null);
  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'preset' | 'url'
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Add / Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category_id: categories[0]?.id || 'cat_1',
    price: '',
    description: '',
    image: '',
    is_available: true,
    is_popular: false
  });

  // Add Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryNameAr, setCategoryNameAr] = useState('');
  const [categoryNameEn, setCategoryNameEn] = useState('');

  // Image Upload Handlers
  const handleModalFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadLoading(true);
      setUploadMessage('');
      const dataUrl = await compressAndReadImage(file);
      setProductForm((prev) => ({ ...prev, image: dataUrl }));
      setUploadMessage('تم رفع الصورة ومعالجتها بنجاح!');
      setTimeout(() => setUploadMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadLoading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleQuickRowImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !quickUploadTargetId) return;
    try {
      setUploadLoading(true);
      const dataUrl = await compressAndReadImage(file);
      updateProduct(quickUploadTargetId, { image: dataUrl });
      setUploadMessage('تم تغيير صورة الوجبة بنجاح!');
      setTimeout(() => setUploadMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadLoading(false);
      setQuickUploadTargetId(null);
      if (e.target) e.target.value = '';
    }
  };

  const triggerQuickRowUpload = (productId) => {
    setQuickUploadTargetId(productId);
    setTimeout(() => {
      if (quickFileInputRef.current) {
        quickFileInputRef.current.click();
      }
    }, 50);
  };

  if (!isOpen) return null;

  // Handle Auth Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && (password === 'mandi2026' || password === 'admin')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // Product Modal Submit
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        price: parseFloat(productForm.price)
      });
    } else {
      addProduct(productForm);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category_id: categories[0]?.id || 'cat_1',
      price: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      is_available: true,
      is_popular: false
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      description: product.description || '',
      image: product.image || '',
      is_available: product.is_available,
      is_popular: product.is_popular || false
    });
    setIsProductModalOpen(true);
  };

  // Add Category Submit
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryNameAr.trim()) return;
    addCategory({
      name_ar: categoryNameAr.trim(),
      name_en: categoryNameEn.trim() || categoryNameAr.trim(),
      icon: 'UtensilsCrossed'
    });
    setCategoryNameAr('');
    setCategoryNameEn('');
    setIsCategoryModalOpen(false);
  };

  // Filtered admin products list
  const adminFilteredProducts = products.filter((p) => {
    const catMatch = filterCat === 'all' || p.category_id === filterCat;
    const searchMatch =
      !adminSearch.trim() ||
      p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(adminSearch.toLowerCase()));
    return catMatch && searchMatch;
  });

  // Sales Analytics Computations
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const filteredOrders = orders.filter((o) => {
    const orderDateStr = new Date(o.date).toISOString().split('T')[0];
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = orderDateStr === todayStr;
    } else if (dateFilter === 'week') {
      const diffTime = Math.abs(now - new Date(o.date));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      matchesDate = diffDays <= 7;
    }

    let matchesType = true;
    if (typeFilter !== 'all') {
      matchesType = o.order_type === typeFilter;
    }

    return matchesDate && matchesType;
  });

  const todayOrders = orders.filter(
    (o) => new Date(o.date).toISOString().split('T')[0] === todayStr
  );
  const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total_price || 0), 0);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
  const filteredRevenue = filteredOrders.reduce((sum, o) => sum + (o.total_price || 0), 0);
  const avgOrderValue = filteredOrders.length > 0 ? filteredRevenue / filteredOrders.length : 0;

  // Compute top sold items
  const itemSalesMap = {};
  filteredOrders.forEach((o) => {
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach((it) => {
        if (!itemSalesMap[it.name]) {
          itemSalesMap[it.name] = { name: it.name, quantity: 0, revenue: 0 };
        }
        itemSalesMap[it.name].quantity += it.quantity;
        itemSalesMap[it.name].revenue += it.price * it.quantity;
      });
    }
  });

  const topSoldItems = Object.values(itemSalesMap).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  // Print Report Handler
  const handlePrintReport = () => {
    window.print();
  };

  // Analytics Stats
  const totalCount = products.length;
  const availableCount = products.filter((p) => p.is_available).length;
  const outOfStockCount = totalCount - availableCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[#12161f] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-[#161a23] to-amber-950 p-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold text-white">لوحة تحكم إدارة مطعم قصر المندي</h2>
              <p className="text-xs text-amber-400/80">إدارة الوجبات، الأسعار، وتقارير المبيعات اليومية</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Barrier */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto my-12 w-full glass-card rounded-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">تسجيل دخول المدير</h3>
              <p className="text-xs text-slate-400">
                أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم والتقارير
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2 space-x-reverse">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">اسم المستخدم</label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#161a23] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">كلمة المرور</label>
                <input
                  type="password"
                  required
                  placeholder="mandi2026"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161a23] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/20 text-sm cursor-pointer"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
            {/* Top Sub-Bar Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161a23] p-3 rounded-xl border border-slate-800">
              {/* Tab Selector */}
              <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setAdminTab('sales')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 space-x-reverse ${
                    adminTab === 'sales'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>تقارير المبيعات والطلبات اليومية</span>
                </button>

                <button
                  onClick={() => setAdminTab('products')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 space-x-reverse ${
                    adminTab === 'products'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>إدارة الوجبات والمنتجات</span>
                </button>

                <button
                  onClick={() => setAdminTab('categories')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 space-x-reverse ${
                    adminTab === 'categories'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>إدارة الأقسام</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 space-x-reverse">
                {adminTab === 'products' && (
                  <button
                    onClick={openAddProductModal}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 space-x-reverse transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة وجبة جديدة</span>
                  </button>
                )}

                {adminTab === 'categories' && (
                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 space-x-reverse transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة قسم جديد</span>
                  </button>
                )}

                {adminTab === 'sales' && (
                  <button
                    onClick={handlePrintReport}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 space-x-reverse transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة التقرير</span>
                  </button>
                )}

                <button
                  onClick={resetToDefaultData}
                  className="bg-slate-800 hover:bg-slate-700 text-rose-400 px-3 py-2 rounded-lg text-xs flex items-center space-x-1 space-x-reverse border border-slate-700 transition-colors"
                  title="استعادة البيانات الأصلية كاملة"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>ضبط المصنع</span>
                </button>
              </div>
            </div>

            {/* SALES REPORTS TAB VIEW */}
            {adminTab === 'sales' && (
              <div className="space-y-5">
                {/* Sales Analytics KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#161a23] p-4 rounded-xl border border-amber-500/30 flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">مبيعات اليوم</div>
                      <div className="text-xl font-black text-amber-400">
                        {todayRevenue.toLocaleString()} <span className="text-xs font-normal">EGP</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#161a23] p-4 rounded-xl border border-emerald-500/30 flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">طلبات اليوم</div>
                      <div className="text-xl font-black text-emerald-400">
                        {todayOrders.length} <span className="text-xs font-normal">طلب</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#161a23] p-4 rounded-xl border border-blue-500/30 flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">متوسط قيمة الطلب</div>
                      <div className="text-xl font-black text-blue-400">
                        {Math.round(avgOrderValue).toLocaleString()} <span className="text-xs font-normal">EGP</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#161a23] p-4 rounded-xl border border-purple-500/30 flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">إجمالي المبيعات الكلي</div>
                      <div className="text-xl font-black text-purple-300">
                        {totalRevenue.toLocaleString()} <span className="text-xs font-normal">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sales Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#161a23] p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-2 space-x-reverse w-full md:w-auto">
                    <span className="text-xs font-bold text-slate-400">فترة التقرير:</span>
                    <button
                      onClick={() => setDateFilter('today')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        dateFilter === 'today'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      اليوم ({todayOrders.length})
                    </button>
                    <button
                      onClick={() => setDateFilter('week')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        dateFilter === 'week'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      آخر 7 أيام
                    </button>
                    <button
                      onClick={() => setDateFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        dateFilter === 'all'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      الكل ({orders.length})
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse w-full md:w-auto">
                    <span className="text-xs font-bold text-slate-400">نوع الطلب:</span>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none"
                    >
                      <option value="all">جميع الطلبات</option>
                      <option value="table">طلبات الترابيزة (المطعم)</option>
                      <option value="delivery">طلبات التوصيل (دليفري)</option>
                    </select>
                  </div>
                </div>

                {/* Top Sold Items Ranking Section */}
                <div className="bg-[#161a23] p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2 space-x-reverse">
                    <TrendingUp className="w-4 h-4" />
                    <span>الأصناف والوجبات الأكثر مبيعاً في التقرير الحالي</span>
                  </h3>

                  {topSoldItems.length === 0 ? (
                    <p className="text-xs text-slate-500 py-2">لا توجد مبيعات مسجلة في هذه الفترة</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      {topSoldItems.map((item, idx) => (
                        <div
                          key={item.name}
                          className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 space-y-1 relative overflow-hidden"
                        >
                          <div className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded inline-block">
                            مركز #{idx + 1}
                          </div>
                          <div className="font-bold text-white text-xs truncate" title={item.name}>
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            الكمية: <span className="font-bold text-emerald-400">{item.quantity}</span>
                          </div>
                          <div className="text-xs font-extrabold text-amber-300">
                            {item.revenue.toLocaleString()} EGP
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Orders Detailed Log Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#161a23]">
                  <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">سجل جميع الطلبات التفصيلي</h4>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      عدد الطلبات: {filteredOrders.length} | المجموع: {filteredRevenue.toLocaleString()} EGP
                    </span>
                  </div>

                  <table className="w-full text-right text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-amber-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">رقم الطلب & الوقت</th>
                        <th className="p-3">اسم العميل</th>
                        <th className="p-3">النوع & المكان</th>
                        <th className="p-3">الوجبات والطلبات</th>
                        <th className="p-3">الواتساب المستلم</th>
                        <th className="p-3">الإجمالي (EGP)</th>
                        <th className="p-3">الحالة والإجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-slate-500">
                            لا توجد طلبات تسليم مسجلة في هذا التصفية
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-white font-mono">{ord.id}</div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(ord.date).toLocaleDateString('ar-EG', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </td>

                            <td className="p-3 font-bold text-slate-100">{ord.customer_name}</td>

                            <td className="p-3">
                              {ord.order_type === 'table' ? (
                                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-bold">
                                  ترابيزة ({ord.table_number || 'غير محدد'})
                                </span>
                              ) : (
                                <span className="bg-blue-500/10 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded text-[11px] font-bold">
                                  دليفري ({ord.delivery_address || 'توصيل'})
                                </span>
                              )}
                            </td>

                            <td className="p-3 max-w-xs">
                              <ul className="space-y-0.5 text-[11px]">
                                {ord.items.map((it, idx) => (
                                  <li key={idx} className="text-slate-300">
                                    • {it.quantity}× {it.name}
                                  </li>
                                ))}
                              </ul>
                              {ord.notes && (
                                <div className="text-[10px] text-amber-400/80 italic mt-1">
                                  ملاحظة: {ord.notes}
                                </div>
                              )}
                            </td>

                            <td className="p-3 font-mono text-[11px] text-emerald-400" dir="ltr">
                              {ord.whatsapp_number}
                            </td>

                            <td className="p-3 font-black text-amber-400 text-sm">
                              {ord.total_price.toLocaleString()} EGP
                            </td>

                            <td className="p-3">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <select
                                  value={ord.status || 'completed'}
                                  onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-amber-300 font-bold focus:outline-none"
                                >
                                  <option value="completed">مكتمل ✅</option>
                                  <option value="pending">قيد التجهيز ⏳</option>
                                  <option value="cancelled">ملغي ❌</option>
                                </select>

                                <button
                                  onClick={() => {
                                    if (confirm('حذف هذا الطلب من السجل؟')) {
                                      deleteOrder(ord.id);
                                    }
                                  }}
                                  className="p-1 text-rose-400 hover:bg-rose-950/60 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PRODUCTS TAB VIEW */}
            {adminTab === 'products' && (
              <div className="space-y-4">
                {/* Search & Category Filter */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="تصفية الوجبات بالسعر أو الاسم..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="w-full bg-[#161a23] border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <select
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="bg-[#161a23] border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400 w-full md:w-auto"
                  >
                    <option value="all">جميع الأقسام ({products.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_ar} (
                        {products.filter((p) => p.category_id === c.id).length})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Row Image Upload Input */}
                <input
                  type="file"
                  ref={quickFileInputRef}
                  onChange={handleQuickRowImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Table View */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#161a23]">
                  <table className="w-full text-right text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-amber-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">الصورة & الوجبة</th>
                        <th className="p-3">القسم</th>
                        <th className="p-3">السعر (EGP)</th>
                        <th className="p-3">حالة الوفرة</th>
                        <th className="p-3 text-center">إجراءات الإدارة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {adminFilteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-500">
                            لا توجد وجبات تطابق معايير البحث
                          </td>
                        </tr>
                      ) : (
                        adminFilteredProducts.map((prod) => {
                          const catObj = categories.find((c) => c.id === prod.category_id);
                          return (
                            <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                              <td className="p-3">
                                <div className="flex items-center space-x-3 space-x-reverse">
                                  <div
                                    onClick={() => triggerQuickRowUpload(prod.id)}
                                    className="relative group/img cursor-pointer w-11 h-11 flex-shrink-0 rounded-lg overflow-hidden border border-amber-500/30 bg-slate-900 shadow"
                                    title="انقر لتغيير صورة هذه الوجبة مباشرة من الجهاز"
                                  >
                                    <img
                                      src={prod.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'}
                                      alt={prod.name}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-amber-400 text-[9px] font-extrabold">
                                      <Camera className="w-4 h-4 mb-0.5" />
                                      <span>تغيير</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-white flex items-center space-x-1.5 space-x-reverse">
                                      <span>{prod.name}</span>
                                      {prod.is_popular && (
                                        <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded">مميز</span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 line-clamp-1 max-w-xs">
                                      {prod.description}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3">
                                <span className="bg-slate-900 px-2.5 py-1 rounded-md text-amber-300 font-medium">
                                  {catObj ? catObj.name_ar : 'عام'}
                                </span>
                              </td>

                              <td className="p-3 font-extrabold text-amber-400 text-sm">
                                {prod.price.toLocaleString()} EGP
                              </td>

                              <td className="p-3">
                                <button
                                  onClick={() => toggleAvailability(prod.id)}
                                  className={`flex items-center space-x-1.5 space-x-reverse px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                    prod.is_available
                                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                                      : 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                                  }`}
                                >
                                  {prod.is_available ? (
                                    <>
                                      <ToggleRight className="w-4 h-4 text-emerald-400" />
                                      <span>متوفر</span>
                                    </>
                                  ) : (
                                    <>
                                      <ToggleLeft className="w-4 h-4 text-rose-400" />
                                      <span>غير متوفر</span>
                                    </>
                                  )}
                                </button>
                              </td>

                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                                  <button
                                    onClick={() => triggerQuickRowUpload(prod.id)}
                                    className="p-1.5 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 rounded-lg border border-blue-500/30 transition-colors flex items-center space-x-1 space-x-reverse cursor-pointer"
                                    title="رفع وتغيير صورة الوجبة من الجهاز"
                                  >
                                    <Camera className="w-4 h-4 text-blue-400" />
                                  </button>

                                  <button
                                    onClick={() => openEditProductModal(prod)}
                                    className="p-1.5 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 rounded-lg border border-amber-500/30 transition-colors"
                                    title="تعديل التفاصيل"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`هل أنت تأكد من حذف وجبة "${prod.name}"؟`)) {
                                        deleteProduct(prod.id);
                                      }
                                    }}
                                    className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg border border-rose-500/30 transition-colors"
                                    title="حذف"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CATEGORIES TAB VIEW */}
            {adminTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const itemsInCat = products.filter((p) => p.category_id === cat.id);
                  return (
                    <div
                      key={cat.id}
                      className="bg-[#161a23] p-4 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
                          <Layers className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{cat.name_ar}</h4>
                          <p className="text-xs text-slate-400">{cat.name_en}</p>
                          <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">
                            عدد الوجبات: {itemsInCat.length} صنف
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`حذف قسم "${cat.name_ar}"؟`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="p-2 text-rose-400 hover:bg-rose-950/60 rounded-lg transition-colors border border-rose-900/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#12161f] border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'تعديل بيانات الوجبة' : 'إضافة وجبة جديدة للمنيو'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">اسم الوجبة بالكامل *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-[#161a23] border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">القسم التابع له *</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category_id: e.target.value })
                    }
                    className="w-full bg-[#161a23] border border-slate-700 rounded-xl p-2.5 text-white font-bold text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_ar}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">السعر بالجنيه (EGP) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-[#161a23] border border-slate-700 rounded-xl p-2.5 text-white font-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">وصف الوجبة والمكونات</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  className="w-full bg-[#161a23] border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              {/* Image Upload & Management Section */}
              <div className="space-y-2 border border-slate-800 bg-[#161a23]/80 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-amber-400 flex items-center space-x-1.5 space-x-reverse">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>صورة الوجبة (رفع جديدة أو تغيير)</span>
                  </label>
                  <span className="text-[11px] text-slate-400">يمكنك رفع صورة من جهازك أو اختياره من المعرض</span>
                </div>

                {/* Live Image Preview */}
                <div className="flex items-center space-x-3 space-x-reverse bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                  <img
                    src={productForm.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'}
                    alt="معاينة الصورة"
                    className="w-16 h-16 rounded-lg object-cover border border-amber-500/40 bg-slate-950 flex-shrink-0"
                  />
                  <div className="flex-1 text-xs space-y-1">
                    <div className="font-bold text-slate-200">الصورة الحالية للمنتج</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 break-all">
                      {productForm.image.startsWith('data:') ? 'صورة مرفوعة رسمياً (Base64)' : productForm.image || 'لم يتم اختيار صورة بعد'}
                    </div>
                    {uploadMessage && (
                      <div className="text-emerald-400 font-bold text-[11px] flex items-center space-x-1 space-x-reverse">
                        <Check className="w-3.5 h-3.5" />
                        <span>{uploadMessage}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tabs for Image Input Mode */}
                <div className="flex border-b border-slate-800 text-[11px] gap-1">
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`py-1.5 px-2.5 rounded-t-lg font-bold transition-colors flex items-center space-x-1 space-x-reverse cursor-pointer ${
                      imageTab === 'upload'
                        ? 'border-b-2 border-amber-400 text-amber-400 bg-amber-500/10'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>رفع صورة من الجهاز</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('preset')}
                    className={`py-1.5 px-2.5 rounded-t-lg font-bold transition-colors flex items-center space-x-1 space-x-reverse cursor-pointer ${
                      imageTab === 'preset'
                        ? 'border-b-2 border-amber-400 text-amber-400 bg-amber-500/10'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>صور جاهزة</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`py-1.5 px-2.5 rounded-t-lg font-bold transition-colors flex items-center space-x-1 space-x-reverse cursor-pointer ${
                      imageTab === 'url'
                        ? 'border-b-2 border-amber-400 text-amber-400 bg-amber-500/10'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>رابط مباشر (URL)</span>
                  </button>
                </div>

                {/* Upload from device tab */}
                {imageTab === 'upload' && (
                  <div className="pt-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleModalFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadLoading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10 transition-all rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer group"
                    >
                      <Upload className="w-6 h-6 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-amber-300 text-xs">
                        {uploadLoading ? 'جاري رفع وضغط الصورة...' : 'انقر لرفع صورة من الهاتف أو الكمبيوتر'}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">يدعم جميع الصور (JPG, PNG, WEBP) ويسحبها بحجم مثالي وسريع</span>
                    </button>
                  </div>
                )}

                {/* Preset Images tab */}
                {imageTab === 'preset' && (
                  <div className="pt-2 grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                    {PRESET_FOOD_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProductForm((prev) => ({ ...prev, image: preset.url }));
                          setUploadMessage(`تم اختار: ${preset.label}`);
                          setTimeout(() => setUploadMessage(''), 2500);
                        }}
                        className={`relative rounded-lg overflow-hidden border p-1 text-right transition-all cursor-pointer ${
                          productForm.image === preset.url
                            ? 'border-amber-400 bg-amber-500/20 shadow-md shadow-amber-500/20'
                            : 'border-slate-800 hover:border-slate-700 bg-slate-900'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-12 object-cover rounded" />
                        <span className="text-[10px] font-bold text-slate-200 block truncate mt-1">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* URL Direct Input tab */}
                {imageTab === 'url' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="w-full bg-[#12161f] border border-slate-700 rounded-xl p-2.5 text-white dir-ltr text-xs focus:border-amber-400"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6 space-x-reverse pt-2">
                <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_available}
                    onChange={(e) =>
                      setProductForm({ ...productForm, is_available: e.target.checked })
                    }
                    className="rounded accent-amber-500 w-4 h-4"
                  />
                  <span className="text-slate-300 font-bold">الوجبة متوفرة للطلب</span>
                </label>

                <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_popular}
                    onChange={(e) =>
                      setProductForm({ ...productForm, is_popular: e.target.checked })
                    }
                    className="rounded accent-amber-500 w-4 h-4"
                  />
                  <span className="text-amber-400 font-bold">تمييز كـ "الأكثر طلباً"</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                حفظ التغييرات
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsCategoryModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-[#12161f] border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">إضافة قسم منيو جديد</h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">اسم القسم بالعربية *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ركن الحلو والمشروبات"
                  value={categoryNameAr}
                  onChange={(e) => setCategoryNameAr(e.target.value)}
                  className="w-full bg-[#161a23] border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">اسم القسم بالإنجليزية</label>
                <input
                  type="text"
                  placeholder="Desserts & Beverages"
                  value={categoryNameEn}
                  onChange={(e) => setCategoryNameEn(e.target.value)}
                  className="w-full bg-[#161a23] border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black py-3 rounded-xl text-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                إضافة القسم الآن
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
