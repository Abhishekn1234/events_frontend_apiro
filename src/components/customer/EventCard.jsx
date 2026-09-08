import { CalendarDays, ChevronRight, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { formatEventDateTime } from "../../utils/date";

const price = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function EventCard({ event }) {
  const soldOut = event.availableTickets <= 0;
  const remaining = event.totalTickets
    ? (event.availableTickets / event.totalTickets) * 100
    : 0;
    
  const availability = soldOut
    ? ["Sold Out", "bg-red-100 text-red-700"]
    : remaining <= 10
    ? ["Almost sold out", "bg-red-100 text-red-700"]
    : remaining <= 30
    ? ["Limited", "bg-amber-100 text-amber-700"]
    : ["Available", "bg-emerald-100 text-emerald-700"];

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-slate-900 px-5 py-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">
            {event.category}
          </span>
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${availability[1]}`}
          >
            {availability[0]}
          </span>
        </div>
        
        <p className="mt-8 text-xs font-medium text-indigo-100">Ticket price</p>
        <p className="text-xl font-bold">{price(event.ticketPrice)}</p>
      </div>

      <div className="p-5">
        <h3 className="min-h-14 text-lg font-bold text-slate-900">
          {event.title}
        </h3>
        
        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <Info icon={CalendarDays} text={formatEventDateTime(event.date)} />
          <Info icon={MapPin} text={event.location} />
        </div>

        <div className="my-5 border-t border-slate-100" />

        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Ticket size={17} className="text-indigo-600" />
            {event.availableTickets} left
          </span>
          
          {soldOut ? (
            <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400">
              Sold out
            </span>
          ) : (
            <Link
              to={`/events/${event._id}`}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              View event <ChevronRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function Info({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={17} className="shrink-0 text-indigo-600" />
      <span className="truncate">{text}</span>
    </div>
  );
}