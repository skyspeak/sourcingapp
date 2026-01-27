import Link from "next/link";
import { cookies } from "next/headers";
import { loginAdminAction } from "@/lib/actions";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { error?: string; next?: string };
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === "true";
  const nextPath = searchParams?.next ?? "/admin";
  const error =
    searchParams?.error === "invalid" ? "Invalid admin password." : null;

  if (!isAdmin) {
    return (
      <div className="mx-auto grid max-w-lg gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Admin access
          </p>
          <h1 className="text-2xl font-semibold">Sign in to manage sourcing</h1>
          <p className="text-sm text-zinc-600">
            Enter the admin password to create and edit deals and founders.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form action={loginAdminAction} className="grid gap-4 text-sm">
          <input type="hidden" name="next" value={nextPath} />
          <label className="grid gap-2">
            Admin password
            <input
              name="password"
              type="password"
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Enter password"
              required
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Admin console
        </p>
        <h1 className="text-3xl font-semibold">Manage sourcing pipeline</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/deals/new"
          className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Deals
          </p>
          <h2 className="mt-2 text-lg font-semibold">Create a new deal</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Capture company, traction, comps, and use-of-funds data.
          </p>
        </Link>
        <Link
          href="/admin/deals"
          className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Deal views
          </p>
          <h2 className="mt-2 text-lg font-semibold">Admin deal hub</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Quickly view and edit deals from one list.
          </p>
        </Link>
        <Link
          href="/admin/founders/new"
          className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Founders
          </p>
          <h2 className="mt-2 text-lg font-semibold">Create founder page</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Track bios, accomplishments, and background.
          </p>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/deals"
          className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700"
        >
          View public deal list
        </Link>
        <Link
          href="/founders"
          className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700"
        >
          View founder pages
        </Link>
      </div>
    </div>
  );
}
