import Link from "next/link";
import { notFound } from "next/navigation";
import { getFounderById } from "@/lib/founders";

export default async function FounderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const founder = await getFounderById(id);
  if (!founder) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Founder profile
          </p>
          <h1 className="text-3xl font-semibold">{founder.name}</h1>
          <p className="mt-2 text-sm text-zinc-600">{founder.title}</p>
        </div>
        <Link
          href="/founders"
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700"
        >
          Back to founders
        </Link>
      </header>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Bio</h2>
        <p className="mt-3 text-sm text-zinc-700">{founder.bio}</p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Accomplishments</h2>
        {founder.accomplishments.length ? (
          <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
            {founder.accomplishments.map((item, index) => (
              <li key={`${item}-${index}`} className="rounded-xl bg-zinc-50 px-4 py-2">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">No accomplishments added.</p>
        )}
      </section>

      {founder.linkedin && (
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Links</h2>
          <a
            href={founder.linkedin}
            className="mt-3 inline-flex text-sm font-semibold text-zinc-900 underline"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn profile
          </a>
        </section>
      )}
    </div>
  );
}
