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
      const result = await client.query('SELECT * FROM orders ORDER BY date DESC LIMIT 200');
      client.release();
      return res.status(200).json({ success: true, orders: result.rows });
    }

    if (req.method === 'POST') {
      const { id, customer_name, order_type, table_number, delivery_address, notes, whatsapp_number, total_price, items } = req.body;

      const orderId = id || 'ord_' + Math.floor(1000 + Math.random() * 9000);
      const result = await client.query(
        `INSERT INTO orders (id, customer_name, order_type, table_number, delivery_address, notes, whatsapp_number, total_price, items, date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP) RETURNING *`,
        [orderId, customer_name, order_type, table_number, delivery_address, notes, whatsapp_number, total_price, JSON.stringify(items)]
      );
      client.release();
      return res.status(201).json({ success: true, order: result.rows[0] });
    }

    if (req.method === 'DELETE') {
      await client.query('TRUNCATE TABLE orders');
      client.release();
      return res.status(200).json({ success: true, message: 'All orders deleted' });
    }

    client.release();
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Orders Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
