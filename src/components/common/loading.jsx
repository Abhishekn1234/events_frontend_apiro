export function CommonLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,1fr)]">
          <div className="h-125 animate-pulse rounded-3xl bg-slate-200" />
          <div className="space-y-5">
            <div className="h-10 animate-pulse rounded bg-slate-200" />
            <div className="h-24 animate-pulse rounded bg-slate-200" />
            <div className="h-48 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
