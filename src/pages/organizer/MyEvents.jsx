import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyEvents } from "../../services/eventService";
import { useOrganizerTheme } from "../../context/OrganizerThemeContext";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../../components/common/ui";
import OrganizerEventCard from "../../components/organizer/OrganizerEventCard";

export default function MyEvents() {
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

  return (
    <div
      className={`min-h-screen ${theme === "quiet" ? "bg-slate-900" : "bg-slate-50"}`}
      data-organizer-theme={theme}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Manage events"
        title="Your events"
        description="Review performance and open the attendee list for any event."
        action={
          <Link
            to="/organizer/events/new"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
          >
            <Plus size={17} />
            Create event
          </Link>
        }
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState
          title="Unable to load your events"
          message={error}
          action={<button type="button" onClick={() => window.location.reload()} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700">Try again</button>}
        />
      ) : events.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <OrganizerEventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events yet"
          description="Your published events will appear here."
          action={
            <Link
              to="/organizer/events/new"
              className="inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white"
            >
              Create event
            </Link>
          }
        />
      )}
      </div>
    </div>
  );
}