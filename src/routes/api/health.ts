import { createFileRoute } from "@tanstack/react-router";
import { Route as PublicHealth } from "./public/health";

// Alias of /api/public/health so monitors can use either address.
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: (ctx) => (PublicHealth.options.server!.handlers as { GET: (c: typeof ctx) => Promise<Response> }).GET(ctx),
    },
  },
});
