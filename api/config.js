export default function handler(request, response) {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    response.status(500).json({ error: "Supabase environment variables are not set" });
    return;
  }

  response.status(200).json({ supabaseUrl, supabaseAnonKey });
}
