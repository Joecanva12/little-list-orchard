import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Tidy" },
      { name: "description", content: "How Todo Lists Co collects, uses and protects your data in Tidy." },
      { property: "og:title", content: "Privacy Policy — Tidy" },
      { property: "og:description", content: "How Todo Lists Co collects, uses and protects your data in Tidy." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

const sections: [string, string][] = [
  ["Who we are", "Tidy is operated by Todo Lists Co (\"we\", \"us\"). We are responsible for the personal data described in this policy."],
  ["What we collect", "Your email address and an encrypted (hashed) password when you create an account; the tasks you add, including their text, completion status and creation time; and basic technical data our hosting needs to run the service, such as IP address, browser type and request logs. We do not use advertising or analytics trackers."],
  ["Why we collect it", "Your email and password let you sign in and let us send account emails such as sign-up confirmation. Your tasks are stored so you can see them on any device. Technical logs keep the service secure and help us fix problems. Our legal basis is providing the service you asked for and our legitimate interest in keeping it secure."],
  ["Who receives it", "We use Lovable (lovable.dev) to host the app, and Lovable Cloud, built on Supabase, to store your account and tasks and handle sign-in. Google Fonts serves the app's fonts, which means your browser shares its IP address with Google when loading them. We do not sell your data or share it with anyone else, except where the law requires it."],
  ["How long we keep it", "We keep your account and tasks for as long as your account exists. Deleted tasks are removed right away. If you ask us to delete your account, we delete your data within 30 days. Technical logs are kept for no longer than 90 days."],
  ["Your rights", "You can ask for a copy of your data, ask us to correct it, or ask us to delete your account and all your tasks. Email privacy@todolist.co from the address on your account and we will respond within 30 days. You may also complain to your local data protection authority."],
  ["Security", "Your data is sent over encrypted connections, passwords are stored hashed, and access rules make sure each person can only see their own tasks."],
  ["Children", "Tidy is not intended for children under 13, and we do not knowingly collect their data."],
  ["Changes", "If we change this policy, we will update the date below. Big changes will be announced in the app."],
  ["Contact", "Todo Lists Co — privacy@todolist.co"],
];

function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/" className="text-sm text-muted-foreground underline">← Back to Tidy</Link>
      <h1 className="mt-6 text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: November 3, 2026</p>
      <div className="mt-8 space-y-6">
        {sections.map(([h, b]) => (
          <section key={h}>
            <h2 className="text-lg font-semibold">{h}</h2>
            <p className="mt-1 text-muted-foreground">{b}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
