import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Graceful fallback: if Supabase env vars are missing, ship a lightweight
// in-memory auth stub so demo/dev environments can still exercise the app.
// Persists to localStorage so refreshes keep the "session".
function createStubClient(): SupabaseClient {
  const STORAGE_KEY = "sherpa-demo-session";
  type Listener = (event: string, session: Record<string, unknown> | null) => void;
  const listeners = new Set<Listener>();

  const readSession = () => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const writeSession = (s: Record<string, unknown> | null) => {
    try {
      if (typeof window === "undefined") return;
      if (s) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  };
  const emit = (event: string, session: Record<string, unknown> | null) => {
    listeners.forEach((l) => { try { l(event, session); } catch { /* ignore */ } });
  };
  const makeSession = (email: string) => {
    const user = { id: `demo_${email}`, email, aud: "authenticated", role: "authenticated" };
    return {
      access_token: "demo-token",
      refresh_token: "demo-refresh",
      token_type: "bearer",
      expires_in: 3600,
      user,
    };
  };

  const authStub = {
    getSession: () => Promise.resolve({ data: { session: readSession() }, error: null }),
    onAuthStateChange: (cb: Listener) => {
      listeners.add(cb);
      return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } };
    },
    signInWithPassword: ({ email }: { email: string; password: string }) => {
      const session = makeSession(email);
      writeSession(session);
      emit("SIGNED_IN", session);
      return Promise.resolve({ data: { session, user: session.user }, error: null });
    },
    signUp: ({ email }: { email: string; password: string }) => {
      const session = makeSession(email);
      writeSession(session);
      emit("SIGNED_IN", session);
      return Promise.resolve({ data: { session, user: session.user }, error: null });
    },
    signOut: () => {
      writeSession(null);
      emit("SIGNED_OUT", null);
      return Promise.resolve({ error: null });
    },
  };
  return { auth: authStub } as unknown as SupabaseClient;
}

export const supabase: SupabaseClient = url && anonKey
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : createStubClient();
