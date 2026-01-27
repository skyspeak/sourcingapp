import Link from "next/link";
import { getDeals } from "@/lib/data";

export default async function Home() {
  const deals = await getDeals();
  const latestDeals = deals.slice(0, 3);

  return (
    <div className="grid gap-10">
      <section className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-12 shadow-lg">
        <div className="grid gap-5">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600 font-bold">
            Deal sourcing workspace
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Curate early-stage fundraises with clarity, traction, and conviction.
          </h1>
          <p className="max-w-2xl text-lg text-gray-700 leading-relaxed">
            Track founder bios, accomplishments, market space, public comps, traction,
            customers, and use of funds in one place. Share decks with DocSend-like
            access gates.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/deals"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            View pipeline
          </Link>
          <Link
            href="/deals/new"
            className="rounded-full border-2 border-gray-300 px-6 py-3 text-sm font-bold text-gray-900 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Add a new deal
          </Link>
        </div>
      </section>

      <section className="grid gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Latest deals</h2>
          <Link className="text-sm font-semibold text-blue-600 hover:text-blue-700" href="/deals">
            View all deals →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestDeals.map((deal) => (
            <Link
              key={deal.id}
              href={`/deals/${deal.id}`}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl hover:border-blue-200"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-bold">
                {deal.stage}
              </p>
              <h3 className="mt-3 text-xl font-bold text-gray-900">{deal.name}</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{deal.space}</p>
              <p className="mt-4 text-xs text-gray-500 font-medium">
                Updated {new Date(deal.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
          {!latestDeals.length && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
              No deals yet. Add your first deal to start sourcing.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
