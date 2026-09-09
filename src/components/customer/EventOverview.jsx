import { CalendarDays, MapPin, Users } from "lucide-react";
import { formatEventDateTime } from "../../utils/date";

export default function EventOverview({ event }) {
  const details = [
    [CalendarDays, "Date and time", formatEventDateTime(event.date)],
    [MapPin, "Location", event.location || "Location TBA"],
    [
      Users,
      "Availability",
      `${event.availableTickets || 0} / ${event.totalTickets || 0} tickets remaining`,
    ],
  ];

  return (
    <div>
      <div className="rounded-3xl bg-linear-to-br from-indigo-700 via-indigo-600 to-slate-900 p-7 text-white sm:p-10">
        <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold">
          {event.category}
        </span>
        <h1 className="mt-12 max-w-3xl break-words text-3xl font-black sm:mt-16 sm:text-5xl">
          {event.title}
        </h1>
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">About this event</h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
          {event.description ||
            "No description has been provided for this event."}
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {details.map(([Icon, label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <Icon size={22} className="text-indigo-600" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {label}
            </p>
            <p className="mt-1 font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}