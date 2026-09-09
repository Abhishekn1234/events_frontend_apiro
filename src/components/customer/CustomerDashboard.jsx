import { Search } from "lucide-react";
import EventCard from "./EventCard";
import { MESSAGES } from "../../constants/messages";

export function CustomerDashboardHeroStat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}

export function CustomerDashboardEventSection({ eyebrow, title, events }) {
  return (
    <section className="mt-14">
      <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}

export function CustomerDashboardMessage({ title, message, action, label = MESSAGES.actions.retry }) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
      <Search size={28} className="mx-auto text-indigo-600" />
      <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{message}</p>
      <button
        type="button"
        onClick={action}
        className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
      >
        {label}
      </button>
    </div>
  );
}