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
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Core details</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Deal name
            <input
              name="name"
              required
              defaultValue={initial?.name ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Aurora Analytics"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Stage
            <input
              name="stage"
              required
              defaultValue={initial?.stage ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Seed"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-2">
            Market space
            <input
              name="space"
              required
              defaultValue={initial?.space ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="AI revenue intelligence for mid-market SaaS"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-2">
            One-line summary
            <textarea
              name="summary"
              rows={3}
              required
              defaultValue={initial?.summary ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="What the company does and why it wins."
            />
          </label>
          <label className="grid gap-2 text-sm">
            Location
            <input
              name="location"
              defaultValue={initial?.location ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="San Francisco, CA"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Fundraising target
            <input
              name="fundraisingTarget"
              required
              defaultValue={initial?.fundraisingTarget ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="$2.5M seed round"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Founder bios & accomplishments</h2>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            Founder bios (one per line)
            <textarea
              name="founders"
              rows={4}
              defaultValue={listToText(initial?.founders)}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Name — role and background"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Past accomplishments (one per line)
            <textarea
              name="accomplishments"
              rows={4}
              defaultValue={listToText(initial?.accomplishments)}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="YC W23 alumni"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Team & customers</h2>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            Team (one per line)
            <textarea
              name="team"
              rows={4}
              defaultValue={listToText(initial?.team)}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Head of Growth — ex-Stripe"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Customers (one per line)
            <textarea
              name="customers"
              rows={4}
              defaultValue={listToText(initial?.customers)}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Launchpad CRM (paid pilot)"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Traction & use of funds</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Deals sold per month
            <input
              name="dealsSoldMonthly"
              type="number"
              min="0"
              defaultValue={initial?.traction.dealsSoldMonthly ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Commitments per month
            <input
              name="commitmentsMonthly"
              type="number"
              min="0"
              defaultValue={initial?.traction.commitmentsMonthly ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-2">
            Traction notes
            <textarea
              name="tractionNotes"
              rows={3}
              defaultValue={initial?.traction.notes ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Revenue, logos, retention, pipeline, GTM signals."
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-2">
            Use of funds
            <textarea
              name="useOfFunds"
              rows={3}
              required
              defaultValue={initial?.useOfFunds ?? ""}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="How the round will be deployed."
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Public market comps</h2>
        <div className="mt-6">
          <label className="grid gap-2 text-sm">
            Comps (one per line)
            <textarea
              name="comps"
              rows={4}
              defaultValue={listToText(initial?.comps)}
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Gong (NASDAQ: GONG)"
            />
          </label>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
