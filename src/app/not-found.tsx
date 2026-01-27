import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Not found</p>
      <h1 className="text-3xl font-semibold">We couldn’t find that page.</h1>
      <p className="text-sm text-zinc-600">
        Check the URL or head back to the deal pipeline.
      </p>
      <div className="flex justify-center">
        <Link
          href="/deals"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
        >
          Go to deals
        </Link>
      </div>
    </div>
  );
}
