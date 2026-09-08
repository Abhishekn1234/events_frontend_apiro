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
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="border-b border-slate-100 bg-linear-to-r from-indigo-700 to-slate-900 px-6 py-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">
            {event.category || "Event"}
          </span>
          <span className="text-xs font-semibold text-indigo-100">
            Booking ID: {booking._id || "N/A"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Link
            to={`/events/${event._id}`}
            className="inline-flex rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-100"
          >
            View event
          </Link>
        </div>
      </div>
    </article>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-indigo-600" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}