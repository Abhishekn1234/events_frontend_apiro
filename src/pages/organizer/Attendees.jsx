import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Users } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEventAttendees, getMyEvents } from "../../services/eventService";
import { useOrganizerTheme } from "../../context/OrganizerThemeContext";
import {
  EmptyState,
  LoadingState,
  PageHeader,
  StatusBadge,
} from "../../components/common/ui";

export default function Attendees() {
  const { theme } = useOrganizerTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const eventId = searchParams.get("event");

  useEffect(() => {
    getMyEvents()
      .then((data) => {
        const list = data.events || data || [];
        setEvents(list);
        if (!eventId && list[0]?._id) {
          setSearchParams({ event: list[0]._id });
        }
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message || "Unable to load events."
        )
      )
      .finally(() => setLoading(false));
  }, [eventId, setSearchParams]);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    getEventAttendees(eventId)
      .then((data) => {
        setAttendees(data.attendees || []);
        setEventInfo(data.event);
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message || "Unable to load attendees."
        )
      )
      .finally(() => setLoading(false));
  }, [eventId]);

  return (
    <div
      className={`min-h-screen ${theme === "quiet" ? "bg-slate-900" : "bg-slate-50"}`}
      data-organizer-theme={theme}
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/organizer/events"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to events
      </Link>
      
      <PageHeader
        eyebrow="Guest list"
        title={eventInfo?.title || "Attendees"}
        description="Confirmed guests for the selected event."
        action={
          <select
            value={eventId || ""}
            onChange={(event) =>
              setSearchParams({ event: event.target.value })
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500"
          >
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
          </select>
        }
      />

      {loading ? (
        <LoadingState />
      ) : attendees.length ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.4fr_1.4fr_0.7fr_0.7fr] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-400 sm:grid">
            <span>Guest</span>
            <span>Email</span>
            <span>Tickets</span>
            <span>Status</span>
          </div>
          
          {attendees.map((booking) => (
            <div
              key={booking._id}
              className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_1.4fr_0.7fr_0.7fr] sm:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Users size={16} />
                </span>
                <span className="font-bold text-slate-900">
                  {booking.customer?.name || "Guest"}
                </span>
              </div>
              
              <a
                href={`mailto:${booking.customer?.email}`}
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600"
              >
                <Mail size={14} />
                {booking.customer?.email || "No email"}
              </a>
              
              <span className="text-sm font-semibold text-slate-600">
                {booking.ticketsBooked} tickets
              </span>
              
              <StatusBadge tone="emerald">Confirmed</StatusBadge>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No confirmed attendees"
          description="Confirmed bookings will appear here as guests reserve tickets."
        />
      )}
      </div>
    </div>
  );
}