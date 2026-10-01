export function getAuthHeader(req) {
  const headers = req.headers || {};
  return headers.authorization || headers.Authorization || null;
}

export async function requireAdmin(req) {
  const authHeader = getAuthHeader(req);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { ok: false, error: 'Missing Authorization token' };
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return { ok: false, error: 'Supabase auth is not configured' };
  }

  const token = authHeader.slice(7);
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: anonKey
      }
    });
    if (!res.ok) {
      return { ok: false, error: 'Invalid or expired session' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Auth verification failed' };
  }
}
