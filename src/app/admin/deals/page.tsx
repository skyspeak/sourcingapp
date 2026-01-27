import Link from "next/link";
import { getDeals } from "@/lib/data";

export default async function AdminDealsPage() {
  const deals = await getDeals();

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Admin deals
          </p>
          <h1 className="text-3xl font-semibold">Quick deal access</h1>
        </div>
        <Link
          href="/deals/new"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
        >
          New deal
        </Link>
      </header>

      <div className="grid gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {deal.stage} · {deal.location || "Location TBD"}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{deal.name}</h2>
              <p className="mt-2 text-sm text-zinc-600">{deal.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link
                href={`/deals/${deal.id}`}
                className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700"
              >
                View
              </Link>
              <Link
                href={`/deals/${deal.id}/edit`}
                className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
        {!deals.length && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
            No deals yet. Create the first deal to start the pipeline.
          </div>
        )}
      </div>
    </div>
  );
}
