import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Ticket,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatEventDateTime } from "../../utils/date";

const price = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function BookingCard({ booking }) {
  const event = booking.event || booking.eventId || {};
  const confirmed = booking.bookingStatus === "CONFIRMED";
  const StatusIcon = confirmed ? CheckCircle2 : XCircle;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative overflow-hidden border-b border-white/10 bg-slate-950 px-5 py-5 text-white sm:px-7">
        <div className="absolute -right-10 -top-14 h-36 w-36 rounded-full border-18 border-indigo-500/20" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-indigo-400/20 px-3 py-1.5 text-xs font-bold text-indigo-100">
            {event.category || "Event"}
          </span>
          <span className="max-w-full truncate text-xs font-semibold text-slate-400">
            Ref: {booking._id || "N/A"}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
              Your reservation
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
              {event.title || "Event"}
            </h2>
          </div>
          <span
            className={`inline-flex h-fit items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-bold ${
              confirmed
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <StatusIcon size={14} />
            {confirmed ? "Confirmed" : booking.bookingStatus || "Unknown"}
          </span>
        </div>

        <div className="mt-7 grid gap-x-6 gap-y-5 border-y border-slate-100 py-6 sm:grid-cols-2">
          <Detail icon={CalendarDays} label="Event date and time" value={formatEventDateTime(event.date)} />
          <Detail icon={MapPin} label="Location" value={event.location || "Location TBA"} />
          <Detail
            icon={Ticket}
            label="Tickets"
            value={`${booking.ticketsBooked || 0} ${
              booking.ticketsBooked === 1 ? "ticket" : "tickets"
            }`}
          />
          <Detail icon={Clock3} label="Amount paid" value={price(booking.totalAmount)} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-slate-400">
            Keep this booking ready for event day.
          </p>
          <Link
            to={`/events/${event._id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
          >
            View event <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={17} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}