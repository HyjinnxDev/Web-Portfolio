import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outputDir = join(root, ".vercel", "output");
const staticDir = join(outputDir, "static");

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(staticDir, { recursive: true });

for (const item of ["index.html", "sites.json", "websites", "shared"]) {
  cpSync(join(root, item), join(staticDir, item), { recursive: true });
}

rmSync(join(staticDir, "websites", "_template"), { recursive: true, force: true });

const funcDir = join(outputDir, "functions", "api", "config.func");
mkdirSync(funcDir, { recursive: true });
cpSync(join(root, "api", "config.js"), join(funcDir, "index.js"));
writeFileSync(
  join(funcDir, ".vc-config.json"),
  JSON.stringify({ runtime: "nodejs22.x", handler: "index.js" }, null, 2)
);

const sites = readdirSync(join(root, "websites"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
  .map((entry) => entry.name);

const routes = [{ handle: "filesystem" }];

for (const slug of sites) {
  routes.push(
    { src: `/${slug}`, dest: `/websites/${slug}/index.html` },
    { src: `/${slug}/`, dest: `/websites/${slug}/index.html` },
    { src: `/${slug}/(.*)`, dest: `/websites/${slug}/$1` }
  );
}

routes.push({ src: "/api/config", dest: "/api/config" });
routes.push({ src: "/", dest: "/index.html" });

writeFileSync(
  join(outputDir, "config.json"),
  JSON.stringify({ version: 3, routes }, null, 2)
);

writeFileSync(
  join(root, "vercel.json"),
  JSON.stringify(
    {
      buildCommand: "node scripts/vercel-build.mjs",
      trailingSlash: true,
    },
    null,
    2
  ) + "\n"
);

console.log(`Built output for ${sites.length} site(s): ${sites.join(", ")}`);
