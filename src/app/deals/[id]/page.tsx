import Link from "next/link";
import { notFound } from "next/navigation";
import { createShareLinkAction, uploadDeckAction } from "@/lib/actions";
import { getDealById } from "@/lib/data";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3 text-sm text-zinc-700">{children}</div>
    </section>
  );
}

function List({ items }: { items?: string[] }) {
  if (!items?.length) {
    return <p className="text-sm text-zinc-500">No entries added yet.</p>;
  }
  return (
    <ul className="grid gap-2">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="rounded-xl bg-zinc-50 px-4 py-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            {deal.stage}
          </p>
          <h1 className="text-3xl font-semibold">{deal.name}</h1>
          <p className="mt-2 text-sm text-zinc-600">{deal.space}</p>
        </div>
        <Link
          href={`/deals/${deal.id}/edit`}
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700"
        >
          Edit deal
        </Link>
      </header>

      <Section title="Snapshot">
        <div className="grid gap-2 text-sm">
          <p>
            <span className="font-semibold text-zinc-900">Summary:</span>{" "}
            {deal.summary || "Not provided."}
          </p>
          <p>
            <span className="font-semibold text-zinc-900">Location:</span>{" "}
            {deal.location || "Not provided."}
          </p>
          <p>
            <span className="font-semibold text-zinc-900">Fundraising target:</span>{" "}
            {deal.fundraisingTarget || "Not provided."}
          </p>
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Founder bios">
          <List items={deal.founders} />
        </Section>
        <Section title="Past accomplishments">
          <List items={deal.accomplishments} />
        </Section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Team">
          <List items={deal.team} />
        </Section>
        <Section title="Customers">
          <List items={deal.customers} />
        </Section>
      </div>

      <Section title="Public market comps">
        <List items={deal.comps} />
      </Section>

      <Section title="Traction">
        <div className="grid gap-2 text-sm">
          <p>
            <span className="font-semibold text-zinc-900">Deals sold / month:</span>{" "}
            {deal.traction.dealsSoldMonthly ?? "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-zinc-900">Commitments / month:</span>{" "}
            {deal.traction.commitmentsMonthly ?? "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-zinc-900">Notes:</span>{" "}
            {deal.traction.notes || "Not provided"}
          </p>
        </div>
      </Section>

      <Section title="Use of funds">
        <p className="text-sm text-zinc-700">
          {deal.useOfFunds || "Not provided."}
        </p>
      </Section>

      <Section title="Fundraising deck">
        <div className="grid gap-3">
          {deal.deck ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
              <p className="font-semibold text-zinc-900">Current deck</p>
              <p className="text-zinc-600">
                Uploaded {new Date(deal.deck.uploadedAt).toLocaleString()}
              </p>
              {deal.deck.filePath && (
                <a
                  className="mt-2 inline-flex text-sm font-semibold text-zinc-900 underline"
                  href={deal.deck.filePath}
                  target="_blank"
                  rel="noreferrer"
                >
                  View uploaded deck
                </a>
              )}
              {deal.deck.externalUrl && (
                <a
                  className="mt-2 inline-flex text-sm font-semibold text-zinc-900 underline"
                  href={deal.deck.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View external deck
                </a>
              )}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No deck uploaded yet. Add one below.
            </p>
          )}

          <form
            action={uploadDeckAction.bind(null, deal.id)}
            className="grid gap-3 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm"
          >
            <label className="grid gap-2">
              Upload PDF deck
              <input name="deckFile" type="file" accept="application/pdf" />
            </label>
            <label className="grid gap-2">
              Or link to an external deck
              <input
                name="externalUrl"
                placeholder="https://..."
                className="rounded-xl border border-zinc-200 px-3 py-2"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Save deck
            </button>
          </form>
        </div>
      </Section>

      <Section title="Deck share links">
        <div className="grid gap-3">
          <form
            action={createShareLinkAction.bind(null, deal.id)}
            className="grid gap-3 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm"
          >
            <div className="grid gap-2 md:grid-cols-2">
              <label className="grid gap-2">
                Optional password
                <input
                  name="password"
                  type="password"
                  className="rounded-xl border border-zinc-200 px-3 py-2"
                  placeholder="Set a password"
                />
              </label>
              <label className="mt-7 flex items-center gap-2 text-sm">
                <input
                  name="emailGateRequired"
                  type="checkbox"
                  defaultChecked
                />
                Require email gate
              </label>
            </div>
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Generate share link
            </button>
          </form>

          {deal.shareLinks.length ? (
            <div className="grid gap-3">
              {deal.shareLinks.map((link) => (
                <div
                  key={link.token}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={`/share/${link.token}`}
                      className="font-semibold text-zinc-900 underline"
                    >
                      /share/{link.token}
                    </Link>
                    <span className="text-xs text-zinc-500">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-600">
                    <span className="rounded-full bg-zinc-100 px-3 py-1">
                      Email gate: {link.emailGateRequired ? "On" : "Off"}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1">
                      Password: {link.password ? "Required" : "None"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No share links yet. Create one to gate deck access.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
