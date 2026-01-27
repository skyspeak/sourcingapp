import { createFounderAction } from "@/lib/actions";

export default function NewFounderPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          New founder
        </p>
        <h1 className="text-3xl font-semibold">Create a founder page</h1>
      </div>

      <form
        action={createFounderAction}
        className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Founder name
            <input
              name="name"
              required
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Maya Chen"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Title
            <input
              name="title"
              required
              className="rounded-xl border border-zinc-200 px-4 py-2"
              placeholder="Co-founder & CEO"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          Bio
          <textarea
            name="bio"
            rows={4}
            required
            className="rounded-xl border border-zinc-200 px-4 py-2"
            placeholder="Short background and highlights."
          />
        </label>

        <label className="grid gap-2 text-sm">
          Accomplishments (one per line)
          <textarea
            name="accomplishments"
            rows={4}
            className="rounded-xl border border-zinc-200 px-4 py-2"
            placeholder="YC W23 alumni"
          />
        </label>

        <label className="grid gap-2 text-sm">
          LinkedIn (optional)
          <input
            name="linkedin"
            className="rounded-xl border border-zinc-200 px-4 py-2"
            placeholder="https://www.linkedin.com/in/..."
          />
        </label>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Create founder page
          </button>
        </div>
      </form>
    </div>
  );
}
