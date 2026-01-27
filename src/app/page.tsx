import Link from "next/link";
import { getDeals } from "@/lib/data";

export default async function Home() {
  const deals = await getDeals();
  const latestDeals = deals.slice(0, 3);

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="grid gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Deal sourcing workspace
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Curate early-stage fundraises with clarity, traction, and conviction.
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            Track founder bios, accomplishments, market space, public comps, traction,
            customers, and use of funds in one place. Share decks with DocSend-like
            access gates.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/deals"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white"
          >
            View pipeline
          </Link>
          <Link
            href="/deals/new"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700"
          >
            Add a new deal
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest deals</h2>
          <Link className="text-sm font-medium text-zinc-600" href="/deals">
            View all deals
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestDeals.map((deal) => (
            <Link
              key={deal.id}
              href={`/deals/${deal.id}`}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {deal.stage}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{deal.name}</h3>
              <p className="mt-2 text-sm text-zinc-600">{deal.space}</p>
              <p className="mt-4 text-xs text-zinc-500">
                Updated {new Date(deal.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
          {!latestDeals.length && (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
              No deals yet. Add your first deal to start sourcing.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
