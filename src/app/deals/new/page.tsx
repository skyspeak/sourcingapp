import DealForm from "@/components/DealForm";
import { createDealAction } from "@/lib/actions";

export default function NewDealPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold">
          New deal
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Capture a sourcing opportunity</h1>
      </div>
      <DealForm action={createDealAction} submitLabel="Create deal" />
    </div>
  );
}
