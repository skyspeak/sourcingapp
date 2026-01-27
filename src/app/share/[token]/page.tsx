import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { verifyShareAccessAction } from "@/lib/actions";
import { getShareLinkByToken } from "@/lib/data";

export default async function SharePage({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams?: { error?: string };
}) {
  const shareData = await getShareLinkByToken(params.token);
  if (!shareData) {
    notFound();
  }

  const { deal, shareLink } = shareData;
  const accessCookie = cookies().get(`share_access_${params.token}`)?.value;
  const gateRequired = shareLink.emailGateRequired || Boolean(shareLink.password);

  if (gateRequired && !accessCookie) {
    const errorMessage =
      searchParams?.error === "wrong-password"
        ? "Password did not match."
        : searchParams?.error === "missing-email"
        ? "Email is required."
        : searchParams?.error === "not-found"
        ? "Share link not found."
        : null;

    return (
      <div className="mx-auto grid max-w-xl gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Secure deck access
          </p>
          <h1 className="text-2xl font-semibold">{deal.name} Deck</h1>
          <p className="text-sm text-zinc-600">
            {shareLink.emailGateRequired
              ? "Enter your email to access the fundraising deck."
              : "Access is gated by password only."}{" "}
            {shareLink.password ? "A password is required." : ""}
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form
          action={verifyShareAccessAction.bind(null, params.token)}
          className="grid gap-4 text-sm"
        >
          <label className="grid gap-2">
            Email
            <input
              name="email"
              type="email"
              required={shareLink.emailGateRequired}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="you@firm.com"
            />
          </label>
          {shareLink.password && (
            <label className="grid gap-2">
              Password
              <input
                name="password"
                type="password"
                className="rounded-xl border border-zinc-200 px-4 py-2"
                placeholder="Enter password"
              />
            </label>
          )}
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Request access
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Deck access granted
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{deal.name}</h1>
        <p className="mt-2 text-sm text-zinc-600">{deal.summary}</p>
        {accessCookie && (
          <p className="mt-4 text-xs text-zinc-500">
            Access granted for {accessCookie}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {deal.deck?.filePath && (
            <a
              href={deal.deck.filePath}
              className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white"
              target="_blank"
              rel="noreferrer"
            >
              Open deck PDF
            </a>
          )}
          {deal.deck?.externalUrl && (
            <a
              href={deal.deck.externalUrl}
              className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700"
              target="_blank"
              rel="noreferrer"
            >
              View external deck
            </a>
          )}
          {!deal.deck && (
            <span className="rounded-full border border-dashed border-zinc-300 px-4 py-2 text-xs text-zinc-500">
              Deck not uploaded yet
            </span>
          )}
          <Link
            href={`/deals/${deal.id}`}
            className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700"
          >
            View deal profile
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Traction snapshot</h2>
          <div className="mt-3 grid gap-2 text-sm text-zinc-700">
            <p>
              Deals sold / month:{" "}
              <span className="font-semibold text-zinc-900">
                {deal.traction.dealsSoldMonthly ?? "N/A"}
              </span>
            </p>
            <p>
              Commitments / month:{" "}
              <span className="font-semibold text-zinc-900">
                {deal.traction.commitmentsMonthly ?? "N/A"}
              </span>
            </p>
            <p className="text-zinc-600">{deal.traction.notes}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Use of funds</h2>
          <p className="mt-3 text-sm text-zinc-700">
            {deal.useOfFunds || "Use of funds not specified."}
          </p>
        </div>
      </div>
    </div>
  );
}
