import Link from "next/link";
import { getDeals } from "@/lib/data";

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold">
            Deal pipeline
          </p>
          <h1 className="text-4xl font-bold text-slate-900">All sourced opportunities</h1>
        </div>
        <Link
          href="/deals/new"
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg transition-all"
        >
          New deal
        </Link>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {deals.map((deal) => (
          <Link
            key={deal.id}
            href={`/deals/${deal.id}`}
            className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl hover:border-blue-400"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-600 font-bold">
              <span className="text-blue-600">{deal.stage}</span>
              <span>{deal.location}</span>
            </div>
            <h2 className="mt-3 text-xl font-bold text-slate-900">{deal.name}</h2>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed font-medium">{deal.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="rounded-full bg-slate-200 px-3 py-1">
                {deal.space}
              </span>
              <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1">
                {deal.fundraisingTarget}
              </span>
            </div>
          </Link>
        ))}
        {!deals.length && (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 font-medium">
            No deals added yet. Start by creating a new opportunity profile.
          </div>
        )}
      </div>
    </div>
  );
}
