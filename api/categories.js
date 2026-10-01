import { getDbPool } from './_db.js';
import { requireAdmin } from './_auth.js';

export default async function handler(req, res) {
  const pool = getDbPool();

  if (!pool) {
    return res.status(200).json({
      fallback: true,
      message: 'No DATABASE_URL configured. Falling back to local storage.'
    });
  }

  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      try {
        const result = await client.query(
          'SELECT * FROM categories ORDER BY order_index ASC, id ASC'
        );
        return res.status(200).json({ success: true, categories: result.rows });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('API Categories GET Error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  const auth = await requireAdmin(req);
  if (!auth.ok) {
    return res.status(401).json({ success: false, error: auth.error });
  }

  try {
    const client = await pool.connect();
    try {
      if (req.method === 'POST') {
        const { id, name_ar, name_en, icon } = req.body;
        if (!name_ar) {
          return res.status(400).json({ error: 'name_ar is required' });
        }
        const categoryId = id || 'cat_' + Date.now();
        const maxOrder = await client.query('SELECT COALESCE(MAX(order_index), 0) + 1 AS next_order FROM categories');
        const result = await client.query(
          `INSERT INTO categories (id, name_ar, name_en, icon, order_index)
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [categoryId, name_ar, name_en || name_ar, icon || 'UtensilsCrossed', maxOrder.rows[0].next_order]
        );
        return res.status(201).json({ success: true, category: result.rows[0] });
      }

      if (req.method === 'PUT') {
        const { id, name_ar, name_en, icon, order_index } = req.body;
        const fields = [];
        const values = [id];
        let paramCount = 2;

        if (name_ar !== undefined) { fields.push(`name_ar = $${paramCount++}`); values.push(name_ar); }
        if (name_en !== undefined) { fields.push(`name_en = $${paramCount++}`); values.push(name_en); }
        if (icon !== undefined) { fields.push(`icon = $${paramCount++}`); values.push(icon); }
        if (order_index !== undefined) { fields.push(`order_index = $${paramCount++}`); values.push(order_index); }

        if (fields.length === 0) {
          return res.status(400).json({ error: 'No fields to update' });
        }

        const query = `UPDATE categories SET ${fields.join(', ')} WHERE id = $1 RETURNING *`;
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, error: 'Category not found' });
        }
        return res.status(200).json({ success: true, category: result.rows[0] });
      }

      if (req.method === 'DELETE') {
        const id = (req.body && req.body.id) || req.query?.id;
        if (!id) {
          return res.status(400).json({ error: 'Category id is required' });
        }
        const result = await client.query('DELETE FROM categories WHERE id = $1', [id]);
        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, error: 'Category not found' });
        }
        return res.status(200).json({ success: true, deleted_id: id });
      }

      return res.status(405).json({ error: 'Method Not Allowed' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('API Categories Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
