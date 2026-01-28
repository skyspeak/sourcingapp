import type { Deal } from "@/lib/types";

type DealFormProps = {
  initial?: Deal | null;
  action: (formData: FormData) => void;
  submitLabel: string;
};

function listToText(list?: string[]) {
  return list?.join("\n") ?? "";
}

export default function DealForm({ initial, action, submitLabel }: DealFormProps) {
  return (
    <form action={action} className="grid gap-8">
      <section className="rounded-3xl border-2 border-slate-300 bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">Core details</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Deal name
            <input
              name="name"
              required
              defaultValue={initial?.name ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Aurora Analytics"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Company link
            <input
              name="companyLink"
              type="url"
              defaultValue={initial?.companyLink ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="https://company.com"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900 md:col-span-2">
            TL;DR
            <textarea
              name="tldr"
              rows={2}
              defaultValue={initial?.tldr ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Quick summary in one sentence"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Stage
            <input
              name="stage"
              required
              defaultValue={initial?.stage ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Seed"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Location
            <input
              name="location"
              defaultValue={initial?.location ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="San Francisco, CA"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900 md:col-span-2">
            Market space
            <input
              name="space"
              required
              defaultValue={initial?.space ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="AI revenue intelligence for mid-market SaaS"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900 md:col-span-2">
            One-line summary
            <textarea
              name="summary"
              rows={3}
              required
              defaultValue={initial?.summary ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="What the company does and why it wins."
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Fundraising target
            <input
              name="fundraisingTarget"
              required
              defaultValue={initial?.fundraisingTarget ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="$2.5M seed round"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Past raise
            <input
              name="pastRaise"
              defaultValue={initial?.pastRaise ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="$500K pre-seed"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Past valuation
            <input
              name="pastValuation"
              defaultValue={initial?.pastValuation ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="$2M post-money"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Expected valuation
            <input
              name="expectedValuation"
              defaultValue={initial?.expectedValuation ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="$10M post-money"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900 md:col-span-2">
            Tentative timeline
            <input
              name="tentativeTimeline"
              defaultValue={initial?.tentativeTimeline ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Closing in Q2 2026"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-300 bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">Founder bios & accomplishments</h2>
        <div className="mt-6 grid gap-6">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Founder bios (one per line)
            <textarea
              name="founders"
              rows={4}
              defaultValue={listToText(initial?.founders)}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Name — role and background"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Past accomplishments (one per line)
            <textarea
              name="accomplishments"
              rows={4}
              defaultValue={listToText(initial?.accomplishments)}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="YC W23 alumni"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-300 bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">Team & customers</h2>
        <div className="mt-6 grid gap-6">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Team (one per line)
            <textarea
              name="team"
              rows={4}
              defaultValue={listToText(initial?.team)}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Head of Growth — ex-Stripe"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Customers (one per line)
            <textarea
              name="customers"
              rows={4}
              defaultValue={listToText(initial?.customers)}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Launchpad CRM (paid pilot)"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-300 bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">Traction & use of funds</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Deals sold per month
            <input
              name="dealsSoldMonthly"
              type="number"
              min="0"
              defaultValue={initial?.traction.dealsSoldMonthly ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Commitments per month
            <input
              name="commitmentsMonthly"
              type="number"
              min="0"
              defaultValue={initial?.traction.commitmentsMonthly ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900 md:col-span-2">
            Traction notes
            <textarea
              name="tractionNotes"
              rows={3}
              defaultValue={initial?.traction.notes ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Revenue, logos, retention, pipeline, GTM signals."
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-900 md:col-span-2">
            Use of funds
            <textarea
              name="useOfFunds"
              rows={3}
              required
              defaultValue={initial?.useOfFunds ?? ""}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="How the round will be deployed."
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-300 bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">Public market comps</h2>
        <div className="mt-6">
          <label className="grid gap-2 text-sm font-bold text-slate-900">
            Comps (one per line)
            <textarea
              name="comps"
              rows={4}
              defaultValue={listToText(initial?.comps)}
              className="rounded-xl border-2 border-slate-300 px-4 py-3 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Gong (NASDAQ: GONG)"
            />
          </label>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 shadow-xl transition-all hover:shadow-2xl hover:scale-105"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
