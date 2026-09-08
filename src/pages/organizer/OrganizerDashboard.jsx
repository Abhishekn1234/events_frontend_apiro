import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  IndianRupee,
  Plus,
  Ticket,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyEvents } from "../../services/eventService";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  StatCard,
} from "../../components/common/ui";
import OrganizerEventCard from "../../components/organizer/OrganizerEventCard";
import { useOrganizerTheme } from "../../context/OrganizerThemeContext";

const money = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function OrganizerDashboard() {
  const { theme } = useOrganizerTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    getMyEvents()
      .then((data) => setEvents(data.events || data || []))
      .catch((requestError) => {
        const message = requestError.response?.data?.message || "Unable to load your events.";
        setError(message);
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, []);

  const totals = events.reduce(
    (summary, event) => ({
      tickets: summary.tickets + Number(event.totalTicketsSold || 0),
      revenue: summary.revenue + Number(event.totalRevenue || 0),
    }),
    { tickets: 0, revenue: 0 }
  );

  const upcoming = events
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 4);

  return (
    <div
      className={`min-h-screen ${
        theme === "quiet" ? "bg-slate-900 text-white" : "bg-slate-50"
      }`}
      data-organizer-theme={theme}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Organizer workspace"
          title="Good events start here."
          description="Keep your upcoming events, ticket momentum, and attendee experience in one clear view."
          action={
            <div className="flex flex-wrap gap-2">
              <Link
                to="/organizer/events/new"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <Plus size={17} />
                Create event
              </Link>
            </div>
          }
        />

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            title="Unable to load your dashboard"
            message={error}
            action={<button type="button" onClick={() => window.location.reload()} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700">Try again</button>}
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total events"
                value={events.length}
                detail="Across your workspace"
                icon={CalendarDays}
              />
              <StatCard
                label="Tickets sold"
                value={totals.tickets}
                detail="Confirmed bookings"
                icon={Ticket}
                accent="emerald"
              />
              <StatCard
                label="Revenue"
                value={money(totals.revenue)}
                detail="From confirmed bookings"
                icon={IndianRupee}
                accent="amber"
              />
              <StatCard
                label="Average fill rate"
                value={
                  events.length
                    ? `${Math.round(
                        (totals.tickets /
                          events.reduce(
                            (sum, event) => sum + Number(event.totalTickets || 0),
                            0
                          )) *
                          100 || 0
                      )}%`
                    : "0%"
                }
                detail="Across all events"
                icon={Users}
                accent="rose"
              />
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
                  Your calendar
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Upcoming events
                </h2>
              </div>
              <Link
                to="/organizer/events"
                className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5">
              {upcoming.length ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {upcoming.map((event) => (
                    <OrganizerEventCard key={event._id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Your calendar is open"
                  description="Create your first event and start building an audience."
                  action={
                    <Link
                      to="/organizer/events/new"
                      className="inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white"
                    >
                      Create your first event
                    </Link>
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}