import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.1/+esm";
import { getSupabaseConfig } from "./supabase.js";

const list = document.getElementById("site-list");

function renderSites(sites) {
  if (!sites.length) {
    list.innerHTML = '<li class="empty">No published sites yet.</li>';
    return;
  }

  list.innerHTML = sites
    .map(
      (site) => `
        <li>
          <a href="/${site.slug}/">
            <strong>${site.title}</strong>
            <span>${site.description || site.slug}</span>
          </a>
        </li>
      `
    )
    .join("");
}

async function loadFromSupabase() {
  const config = await getSupabaseConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

  const { data, error } = await supabase
    .from("portfolio_sites")
    .select("slug, title, description, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

async function loadFromManifest() {
  const response = await fetch("/sites.json");
  if (!response.ok) throw new Error("sites.json unavailable");
  return response.json();
}

try {
  const sites = await loadFromSupabase();
  renderSites(sites);
} catch {
  try {
    const sites = await loadFromManifest();
    renderSites(sites);
  } catch {
    list.innerHTML =
      '<li class="empty">Could not load sites. Check Supabase config or sites.json.</li>';
  }
}
