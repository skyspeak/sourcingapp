"use client";

import { useState } from "react";
import Link from "next/link";
import { bulkUploadDealsAction } from "@/lib/actions";
import { generateSampleCSV } from "@/lib/csv-parser";

export default function BulkUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleDownloadTemplate = () => {
    const csv = generateSampleCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deals-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResult(null);

    try {
      const text = await file.text();
      const uploadResult = await bulkUploadDealsAction(text);
      setResult(uploadResult);
    } catch (error) {
      setResult({
        success: 0,
        failed: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Bulk upload
          </p>
          <h1 className="text-3xl font-semibold">Import deals from CSV</h1>
        </div>
        <Link
          href="/admin"
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700"
        >
          Back to admin
        </Link>
      </header>

      <div className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">CSV Format</h2>
          <p className="text-sm text-zinc-600">
            Upload a CSV file with deal data. Each row will create a new deal.
            Use pipes (|) to separate multiple items in list fields.
          </p>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              Required columns:
            </h3>
            <ul className="mt-2 grid gap-1 text-sm text-zinc-700">
              <li>• name</li>
              <li>• space</li>
              <li>• stage</li>
              <li>• summary</li>
              <li>• fundraisingTarget</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              Optional columns:
            </h3>
            <ul className="mt-2 grid gap-1 text-sm text-zinc-700">
              <li>
                • companyLink, tldr, location, pastRaise, pastValuation,
                expectedValuation, tentativeTimeline
              </li>
              <li>
                • useOfFunds, dealsSoldMonthly, commitmentsMonthly, tractionNotes
              </li>
              <li>• founders, accomplishments, team, customers, comps (use | separator)</li>
              <li>• deckUrl</li>
            </ul>
          </div>

          <button
            onClick={handleDownloadTemplate}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
          >
            Download CSV template
          </button>
        </div>

        <div className="border-t border-zinc-200 pt-6">
          <h2 className="text-xl font-semibold">Upload CSV</h2>
          <div className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm">
              Choose file
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploading}
                className="rounded-xl border border-zinc-200 px-4 py-2"
              />
            </label>

            {uploading && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                Processing CSV file...
              </div>
            )}

            {result && (
              <div className="grid gap-3">
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  Successfully imported {result.success} deal(s)
                </div>

                {result.failed > 0 && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-semibold text-red-700">
                      {result.failed} row(s) failed:
                    </p>
                    <ul className="mt-2 grid gap-1 text-sm text-red-600">
                      {result.errors.map((error, i) => (
                        <li key={i}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.success > 0 && (
                  <Link
                    href="/admin/deals"
                    className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    View imported deals
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
