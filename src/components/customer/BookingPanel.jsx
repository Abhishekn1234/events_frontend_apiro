import { CheckCircle2, Loader2, Minus, Plus, Ticket } from "lucide-react";

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function BookingPanel({
  event,
  tickets,
  booking,
  onIncrease,
  onDecrease,
  onBook,
}) {
  const available = Number(event.availableTickets || 0);
  const price = Number(event.ticketPrice || 0);
  const soldOut = available <= 0;

  return (
    <aside>
      <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-slate-500">Ticket price</p>
        <p className="mt-1 text-3xl font-black text-slate-900">
          {formatPrice(price)}
        </p>
        <p className="mt-1 text-xs text-slate-400">per ticket</p>

        <div className="my-6 border-t border-slate-100" />

        <div
          className={`flex items-center gap-3 rounded-xl p-4 ${
            soldOut ? "bg-red-50" : "bg-emerald-50"
          }`}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              soldOut ? "bg-red-100" : "bg-emerald-100"
            }`}
          >
            {soldOut ? (
              <Ticket size={18} className="text-red-600" />
            ) : (
              <CheckCircle2 size={18} className="text-emerald-600" />
            )}
          </div>
          <div>
            <p
              className={`text-sm font-bold ${
                soldOut ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {soldOut ? "Sold out" : `${available} tickets available`}
            </p>
            {!soldOut && (
              <p className="text-xs text-slate-500">
                Book before they sell out.
              </p>
            )}
          </div>
        </div>

        {!soldOut ? (
          <>
            <div className="mt-7">
              <label className="text-sm font-bold text-slate-900">
                Number of tickets
              </label>
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 p-2">
                <button
                  type="button"
                  onClick={onDecrease}
                  disabled={tickets <= 1 || booking}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>
                <span className="text-xl font-bold text-slate-900">
                  {tickets}
                </span>
                <button
                  type="button"
                  onClick={onIncrease}
                  disabled={tickets >= available || booking}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <div className="flex justify-between text-sm text-slate-500">
                <span>
                  {formatPrice(price)} x {tickets}
                </span>
                <span>{formatPrice(price * tickets)}</span>
              </div>
              <div className="my-4 border-t border-slate-200" />
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-indigo-600">
                  {formatPrice(price * tickets)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBook}
              disabled={booking}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-60"
            >
              {booking ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Processing booking...
                </>
              ) : (
                <>
                  <Ticket size={19} />
                  Book {tickets} {tickets === 1 ? "ticket" : "tickets"}
                </>
              )}
            </button>
          </>
        ) : (
          <button
            disabled
            className="mt-6 w-full rounded-2xl bg-slate-100 px-6 py-4 text-sm font-bold text-slate-400"
          >
            Sold out
          </button>
        )}

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          Your booking is confirmed only after the request succeeds.
        </p>
      </div>
    </aside>
  );
}