import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tidy — Your To-Do List" },
      { name: "description", content: "A simple, calm to-do list that saves your tasks to the cloud." },
      { property: "og:title", content: "Tidy — Your To-Do List" },
      { property: "og:description", content: "A simple, calm to-do list that saves your tasks to the cloud." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Todo = { id: string; title: string; done: boolean; created_at: string };

function Index() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-6xl text-foreground">Tidy.</h1>
        <p className="mt-2 text-muted-foreground">One list. Less noise.</p>
        <div className="mt-10">
          {!ready ? null : session ? <Todos email={session.user.email ?? ""} /> : <AuthForm />}
        </div>
      </div>
    </main>
  );
}

function AuthForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setMsg(error.message);
      else if (!data.session) setMsg("Check your email to confirm your account.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl border bg-card p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{mode === "in" ? "Sign in" : "Create account"}</h2>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
      {mode === "up" && (
        <p className="text-xs text-muted-foreground">
          By signing up you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and{" "}
          <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      )}
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <Button type="submit" className="w-full" disabled={busy}>
        {mode === "in" ? "Sign in" : "Sign up"}
      </Button>
      <button type="button" className="text-sm text-muted-foreground underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "No account? Sign up" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

function Todos({ email }: { email: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  async function load() {
    const { data } = await supabase.from("todos").select("*").order("created_at");
    setTodos(data ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    setTitle("");
    await supabase.from("todos").insert({ title: t });
    load();
  }
  async function toggle(todo: Todo) {
    setTodos((ts) => ts.map((x) => (x.id === todo.id ? { ...x, done: !x.done } : x)));
    await supabase.from("todos").update({ done: !todo.done }).eq("id", todo.id);
  }
  async function remove(id: string) {
    setTodos((ts) => ts.filter((x) => x.id !== id));
    await supabase.from("todos").delete().eq("id", id);
  }

  const left = todos.filter((t) => !t.done).length;

  return (
    <div>
      <form onSubmit={add} className="flex gap-2">
        <Input placeholder="What needs doing?" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button type="submit">Add</Button>
      </form>
      <ul className="mt-6 divide-y rounded-xl border bg-card shadow-soft">
        {todos.length === 0 && <li className="p-6 text-center text-muted-foreground">Nothing yet — add your first task.</li>}
        {todos.map((t) => (
          <li key={t.id} className="group flex items-center gap-3 px-4 py-3">
            <Checkbox checked={t.done} onCheckedChange={() => toggle(t)} />
            <span className={t.done ? "flex-1 text-muted-foreground line-through" : "flex-1"}>{t.title}</span>
            <button aria-label="Delete" onClick={() => remove(t.id)} className="text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{left} left · {email}</span>
        <button className="underline" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
    </div>
  );
}
