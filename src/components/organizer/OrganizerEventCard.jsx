import { CalendarDays, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../common/ui";
import { formatEventDateTime } from "../../utils/date";

const money = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function OrganizerEventCard({ event }) {
  const upcoming = new Date(event.date) >= new Date();
  const sold = Number(event.totalTicketsSold || 0);
  const total = Number(event.totalTickets || 0);

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <CalendarDays size={19} />
        </span>
        <StatusBadge tone={upcoming ? "emerald" : "slate"}>
          {upcoming ? "Upcoming" : "Past"}
        </StatusBadge>
      </div>

      <h2 className="mt-5 text-xl font-black text-slate-950">
        {event.title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {formatEventDateTime(event.date)} · {event.location}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <Metric label="Tickets sold" value={`${sold} / ${total}`} />
        <Metric label="Revenue" value={money(event.totalRevenue)} />
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{
            width: `${Math.min(100, total ? (sold / total) * 100 : 0)}%`,
          }}
        />
      </div>

      <Link
        to={`/organizer/attendees?event=${event._id}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
      >
        <Users size={16} />
        View attendees
      </Link>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className="mt-1 font-black text-slate-900">{value}</p>
    </div>
  );
}