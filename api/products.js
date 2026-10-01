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
          'SELECT * FROM products ORDER BY order_index ASC, id ASC'
        );
        return res.status(200).json({ success: true, products: result.rows });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('API Products GET Error:', error);
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
        const { id, category_id, name, price, description, image, is_available, is_popular } = req.body;
        const productId = id || 'p_' + Date.now();
        const maxOrder = await client.query('SELECT COALESCE(MAX(order_index), 0) + 1 AS next_order FROM products');
        const result = await client.query(
          `INSERT INTO products (id, category_id, name, price, description, image, is_available, is_popular, order_index)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
          [
            productId,
            category_id,
            name,
            price,
            description || '',
            image || '',
            is_available ?? true,
            is_popular ?? false,
            maxOrder.rows[0].next_order
          ]
        );
        return res.status(201).json({ success: true, product: result.rows[0] });
      }

      if (req.method === 'PUT') {
        const { id, is_available, price, name, description, image, category_id, is_popular, order_index } = req.body;
        const fields = [];
        const values = [id];
        let paramCount = 2;

        if (is_available !== undefined) { fields.push(`is_available = $${paramCount++}`); values.push(is_available); }
        if (price !== undefined) { fields.push(`price = $${paramCount++}`); values.push(price); }
        if (name !== undefined) { fields.push(`name = $${paramCount++}`); values.push(name); }
        if (description !== undefined) { fields.push(`description = $${paramCount++}`); values.push(description); }
        if (image !== undefined) { fields.push(`image = $${paramCount++}`); values.push(image); }
        if (category_id !== undefined) { fields.push(`category_id = $${paramCount++}`); values.push(category_id); }
        if (is_popular !== undefined) { fields.push(`is_popular = $${paramCount++}`); values.push(is_popular); }
        if (order_index !== undefined) { fields.push(`order_index = $${paramCount++}`); values.push(order_index); }

        if (fields.length === 0) {
          return res.status(400).json({ error: 'No fields to update' });
        }

        const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $1 RETURNING *`;
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        return res.status(200).json({ success: true, product: result.rows[0] });
      }

      if (req.method === 'DELETE') {
        const id = (req.body && req.body.id) || req.query?.id;
        if (!id) {
          return res.status(400).json({ error: 'Product id is required' });
        }
        const result = await client.query('DELETE FROM products WHERE id = $1', [id]);
        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        return res.status(200).json({ success: true, deleted_id: id });
      }

      return res.status(405).json({ error: 'Method Not Allowed' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('API Products Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
