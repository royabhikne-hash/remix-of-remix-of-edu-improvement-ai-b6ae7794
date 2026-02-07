import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

const renderFatal = (title: string, details?: string) => {
  if (!rootEl) return;
  rootEl.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:hsl(var(--background));color:hsl(var(--foreground));font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;">
      <div style="max-width:720px;width:100%;border:1px solid hsl(var(--border));border-radius:16px;padding:20px;background:hsl(var(--card));">
        <div style="font-weight:700;font-size:18px;">${title}</div>
        <div style="margin-top:8px;font-size:14px;opacity:0.85;line-height:1.5;">
          Please reload the page. If the issue persists, try a different network (Wi‑Fi vs mobile data).
        </div>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
          <button id="__sbai_reload" style="padding:10px 14px;border-radius:12px;border:0;background:hsl(var(--primary));color:hsl(var(--primary-foreground));font-weight:600;cursor:pointer;">Reload</button>
        </div>
        ${details ? `<pre style="margin-top:14px;white-space:pre-wrap;word-break:break-word;background:hsl(var(--muted));padding:12px;border-radius:12px;font-size:12px;">${details}</pre>` : ""}
      </div>
    </div>
  `;

  const btn = document.getElementById("__sbai_reload");
  btn?.addEventListener("click", () => window.location.reload());
};

// Catch module-load failures (prevents a blank white screen on slow mobile networks)
window.addEventListener("unhandledrejection", (event) => {
  const msg = event.reason instanceof Error ? event.reason.message : String(event.reason ?? "");
  const isDynImportFailure =
    msg.includes("dynamically imported module") ||
    msg.includes("Failed to fetch dynamically imported module");

  if (!isDynImportFailure) return;

  console.error("Unhandled rejection (dynamic import):", event.reason);
  event.preventDefault();
  renderFatal("A module failed to load", msg);
});

if (!rootEl) {
  // Should never happen, but avoid silent white screen
  throw new Error("Root element #root not found");
}

try {
  createRoot(rootEl).render(<App />);
} catch (err) {
  console.error("React failed to mount:", err);
  renderFatal("App failed to start", err instanceof Error ? err.message : String(err));
}

