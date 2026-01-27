import Link from "next/link";
import { getFounders } from "@/lib/founders";

export default async function FoundersPage() {
  const founders = await getFounders();

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Founder pages
          </p>
          <h1 className="text-3xl font-semibold">Founder profiles</h1>
        </div>
        <Link
          href="/admin/founders/new"
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700"
        >
          Add founder
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {founders.map((founder) => (
          <Link
            key={founder.id}
            href={`/founders/${founder.id}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {founder.title}
            </p>
            <h2 className="mt-3 text-xl font-semibold">{founder.name}</h2>
            <p className="mt-2 text-sm text-zinc-600">{founder.bio}</p>
          </Link>
        ))}
        {!founders.length && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
            No founder pages yet. Add the first founder profile.
          </div>
        )}
      </div>
    </div>
  );
}
