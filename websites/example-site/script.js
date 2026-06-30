import { createSupabaseClient } from "/shared/supabase.js";

const status = document.getElementById("supabase-status");

try {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("portfolio_sites")
    .select("title")
    .eq("slug", "example-site")
    .maybeSingle();

  if (error) throw error;

  status.textContent = data
    ? `Supabase connected — registered as “${data.title}”.`
    : "Supabase connected — site not found in portfolio_sites table.";
  status.classList.add("ok");
} catch (err) {
  status.textContent = `Supabase unavailable: ${err.message}`;
  status.classList.add("error");
}
