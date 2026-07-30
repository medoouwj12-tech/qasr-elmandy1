import { getDbPool } from './_db.js';

export default async function handler(req, res) {
  const pool = getDbPool();

  if (!pool) {
    return res.status(200).json({
      fallback: true,
      message: 'No Neon DATABASE_URL configured. Falling back to local storage.'
    });
  }

  try {
    const client = await pool.connect();

    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM products ORDER BY order_index ASC, id ASC');
      client.release();
      return res.status(200).json({ success: true, products: result.rows });
    }

    if (req.method === 'POST') {
      const { id, category_id, name, price, description, image, is_available, is_popular } = req.body;
      const result = await client.query(
        `INSERT INTO products (id, category_id, name, price, description, image, is_available, is_popular)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [id || 'p_' + Date.now(), category_id, name, price, description, image, is_available ?? true, is_popular ?? false]
      );
      client.release();
      return res.status(201).json({ success: true, product: result.rows[0] });
    }

    if (req.method === 'PUT') {
      const { id, is_available, price, name, description, image, category_id, is_popular } = req.body;
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

      if (fields.length === 0) {
        client.release();
        return res.status(400).json({ error: 'No fields to update' });
      }

      const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $1 RETURNING *`;
      const result = await client.query(query, values);
      client.release();
      return res.status(200).json({ success: true, product: result.rows[0] });
    }

    client.release();
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Products Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
