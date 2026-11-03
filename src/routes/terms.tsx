import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Tidy" },
      { name: "description", content: "The terms that apply when you use Tidy, the simple to-do list app." },
      { property: "og:title", content: "Terms of Service — Tidy" },
      { property: "og:description", content: "The terms that apply when you use Tidy, the simple to-do list app." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

const sections: [string, string][] = [
  ["1. Who we are", "Tidy (\"we\", \"us\") provides an online to-do list service at little-list-orchard.lovable.app. By creating an account or using Tidy, you agree to these terms."],
  ["2. The service", "Tidy lets you create, complete and delete personal tasks that are saved to your account. We may improve, change or discontinue features at any time."],
  ["3. Your account", "You must provide a valid email address and keep your password secure. You are responsible for activity under your account. You must be at least 13 years old to use Tidy."],
  ["4. Pricing", "Tidy is currently free to use. If we introduce paid plans, prices will be shown before you pay and these terms will be updated."],
  ["5. Refunds", "Because Tidy is free, no payments are taken and no refunds apply. If paid plans are introduced, any refund policy will be shown at checkout."],
  ["6. Your content", "You own the tasks you create. You give us permission to store and display them to you so the service works. Do not use Tidy for unlawful, harmful or abusive content."],
  ["7. Acceptable use", "Do not try to access other users' data, disrupt the service, or use automated tools to overload it. We may suspend accounts that break these rules."],
  ["8. Termination", "You may stop using Tidy at any time. We may suspend or close accounts that violate these terms."],
  ["9. Disclaimer", "Tidy is provided \"as is\" without warranties of any kind. We do not guarantee the service will be uninterrupted or error-free."],
  ["10. Limitation of liability", "To the maximum extent allowed by law, we are not liable for indirect or consequential losses, including lost data or missed tasks."],
  ["11. Governing law", "These terms are governed by the laws of Pakistan, and disputes will be handled by the courts of Pakistan."],
  ["12. Changes", "We may update these terms. Continued use after changes means you accept the new terms."],
];

function Terms() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/" className="text-sm text-muted-foreground underline">← Back to Tidy</Link>
      <h1 className="mt-6 text-4xl font-semibold">Terms of Service</h1>
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
