import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { routeTree } from "./routeTree.gen";
import { getNonce } from "./lib/csp-nonce";

const readNonce = createIsomorphicFn()
  .server(() => getNonce(getRequest()))
  .client(() => undefined);

export const getRouter = () => {
  const queryClient = new QueryClient();
  const nonce = readNonce();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(nonce ? { ssr: { nonce } } : {}),
  });

  return router;
};
