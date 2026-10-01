import { Pool } from 'pg';

function buildPoolUrl(connectionString) {
  // Supabase pooler certificates chain to a self-signed root, while newer pg
  // treats sslmode=require as verify-full. Use libpq-compatible semantics
  // (encrypt without certificate chain verification) for Supabase only.
  if (!connectionString.includes('supabase')) {
    return { url: connectionString, ssl: undefined };
  }
  if (connectionString.includes('sslmode=') && !connectionString.includes('sslmode=require')) {
    return { url: connectionString, ssl: undefined };
  }
  if (connectionString.includes('sslmode=require')) {
    if (connectionString.includes('uselibpqcompat')) {
      return { url: connectionString, ssl: undefined };
    }
    return {
      url: connectionString.replace('sslmode=require', 'uselibpqcompat=true&sslmode=require'),
      ssl: undefined
    };
  }
  // No sslmode specified: enforce TLS explicitly
  return { url: connectionString, ssl: { rejectUnauthorized: false } };
}

export function getDbPool() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.SUPABASE_DB_URL ||
    process.env.POSTGRES_URL;

  if (!connectionString) {
    return null;
  }

  const { url, ssl } = buildPoolUrl(connectionString);

  return new Pool({
    connectionString: url,
    ...(ssl ? { ssl } : {}),
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000
  });
}
