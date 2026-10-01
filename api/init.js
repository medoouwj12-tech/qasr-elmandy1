import { getDbPool } from './_db.js';
import { requireAdmin } from './_auth.js';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../src/data/initialData.js';

export default async function handler(req, res) {
  const pool = getDbPool();

  if (!pool) {
    return res.status(200).json({
      success: false,
      message: 'DATABASE_URL environment variable is not configured yet. App runs in Client Storage mode.'
    });
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Factory reset: wipe menu and reseed from initialData (requires admin auth)
  const wantsReset = req.method === 'POST' && req.body && req.body.reset === true;
  if (wantsReset) {
    const auth = await requireAdmin(req);
    if (!auth.ok) {
      return res.status(401).json({ success: false, error: auth.error });
    }
  }

  const client = await pool.connect();
  try {
    if (wantsReset) {
      await client.query('DELETE FROM products');
      await client.query('DELETE FROM categories');
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
          id VARCHAR(50) PRIMARY KEY,
          name_ar VARCHAR(100) NOT NULL,
          name_en VARCHAR(100),
          icon VARCHAR(50) DEFAULT 'UtensilsCrossed',
          order_index INT DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(50) PRIMARY KEY,
          category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          price NUMERIC(10, 2) NOT NULL,
          description TEXT,
          image TEXT,
          is_available BOOLEAN DEFAULT TRUE,
          is_popular BOOLEAN DEFAULT FALSE,
          order_index INT DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(50) PRIMARY KEY,
          customer_name VARCHAR(100) NOT NULL,
          order_type VARCHAR(20) NOT NULL,
          table_number VARCHAR(50),
          delivery_address TEXT,
          notes TEXT,
          whatsapp_number VARCHAR(20) NOT NULL,
          total_price NUMERIC(10, 2) NOT NULL,
          status VARCHAR(20) DEFAULT 'completed',
          items JSONB NOT NULL,
          date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    for (const cat of INITIAL_CATEGORIES) {
      await client.query(
        `INSERT INTO categories (id, name_ar, name_en, icon, order_index)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [cat.id, cat.name_ar, cat.name_en, cat.icon, cat.order]
      );
    }

    let seededProducts = 0;
    for (const p of INITIAL_PRODUCTS) {
      const result = await client.query(
        `INSERT INTO products (id, category_id, name, price, description, image, is_available, is_popular, order_index)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [
          p.id,
          p.category_id,
          p.name,
          p.price,
          p.description || '',
          p.image || '',
          p.is_available ?? true,
          p.is_popular ?? false,
          p.order ?? 0
        ]
      );
      seededProducts += result.rowCount || 0;
    }

    const catCount = await client.query('SELECT COUNT(*)::int AS count FROM categories');
    const prodCount = await client.query('SELECT COUNT(*)::int AS count FROM products');

    return res.status(200).json({
      success: true,
      message: 'Supabase database successfully initialized for Qasr Al-Mandi!',
      seeded_products: seededProducts,
      total_categories: catCount.rows[0].count,
      total_products: prodCount.rows[0].count
    });
  } catch (error) {
    console.error('Supabase Init Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
}
