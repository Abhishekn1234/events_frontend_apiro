export function Unavailable({ message }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Ticket className="text-red-500" size={28} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Event unavailable
        </h1>
        <p className="mt-2 text-slate-500">
          {message || "We couldn't find this event."}
        </p>
        <Link
          to="/customer/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
        >
          <ArrowLeft size={17} />
          Back to events
        </Link>
      </div>
    </div>
  );
}