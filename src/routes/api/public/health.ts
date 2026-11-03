import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/public/health")({
  server: {
    handlers: {
      GET: async () => {
        const headers = { "content-type": "application/json", "cache-control": "no-store" };
        try {
          const url = process.env['SUPABASE_URL'] ?? process.env['VITE_SUPABASE_URL'];
          const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['VITE_SUPABASE_PUBLISHABLE_KEY'];
          if (!url || !key) throw new Error("config");
          const sb = createClient(url, key, { auth: { persistSession: false } });
          // Lightweight query; RLS returns zero rows for anonymous callers, which is fine.
          const { error } = await sb.from("todos").select("id", { head: true }).limit(1);
          if (error) throw error;
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
        } catch {
          return new Response(JSON.stringify({ ok: false }), { status: 503, headers });
        }
      },
    },
  },
});
