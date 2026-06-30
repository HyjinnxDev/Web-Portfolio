let cachedConfig;

export async function getSupabaseConfig() {
  if (cachedConfig) return cachedConfig;

  const response = await fetch("/api/config/");
  if (!response.ok) {
    throw new Error("Supabase config unavailable");
  }

  cachedConfig = await response.json();
  return cachedConfig;
}

export async function createSupabaseClient() {
  const { createClient } = await import(
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.1/+esm"
  );
  const config = await getSupabaseConfig();
  return createClient(config.supabaseUrl, config.supabaseAnonKey);
}
