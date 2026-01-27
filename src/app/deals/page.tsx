import Link from "next/link";
import { getDeals } from "@/lib/data";

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Deal pipeline
          </p>
          <h1 className="text-3xl font-semibold">All sourced opportunities</h1>
        </div>
        <Link
          href="/deals/new"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
        >
          New deal
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {deals.map((deal) => (
          <Link
            key={deal.id}
            href={`/deals/${deal.id}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span>{deal.stage}</span>
              <span>{deal.location}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{deal.name}</h2>
            <p className="mt-2 text-sm text-zinc-600">{deal.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                {deal.space}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                {deal.fundraisingTarget}
              </span>
            </div>
          </Link>
        ))}
        {!deals.length && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
            No deals added yet. Start by creating a new opportunity profile.
          </div>
        )}
      </div>
    </div>
  );
}
