import { notFound } from "next/navigation";
import DealForm from "@/components/DealForm";
import { updateDealAction } from "@/lib/actions";
import { getDealById } from "@/lib/data";

export default async function EditDealPage({
  params,
}: {
  params: { id: string };
}) {
  const deal = await getDealById(params.id);
  if (!deal) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Edit deal
        </p>
        <h1 className="text-3xl font-semibold">Update sourcing details</h1>
      </div>
      <DealForm
        initial={deal}
        action={updateDealAction.bind(null, deal.id)}
        submitLabel="Save changes"
      />
    </div>
  );
}
