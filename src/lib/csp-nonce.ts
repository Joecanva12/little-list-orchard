// Per-request CSP nonce shared between the security-headers middleware and the router's SSR scripts.
const store = new WeakMap<Request, string>();
export function setNonce(req: Request, nonce: string) { store.set(req, nonce); }
export function getNonce(req: Request) { return store.get(req); }
