import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Ticket } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEventById } from "../../services/eventService";
import { bookEvent } from "../../services/bookingService";
import EventOverview from "../../components/customer/EventOverview";
import BookingPanel from "../../components/customer/BookingPanel";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEventById(id);
      setEvent(data.event || data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to load event details.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const book = async () => {
    if (!event) return;
    if (!Number.isInteger(tickets) || tickets < 1) {
      return toast.error("Choose at least one ticket.");
    }
    if (event.availableTickets <= 0)
      return toast.error("This event is sold out.");
    if (tickets > event.availableTickets)
      return toast.error("Not enough tickets available.");
    
    try {
      setBooking(true);
      await bookEvent(event._id, tickets);
      toast.success("Booking confirmed successfully!");
      navigate("/customer/my-bookings");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Booking failed. Please try again."
      );
      fetchEvent();
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loading />;
  if (error || !event) return <Unavailable message={error} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/customer/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to events
        </Link>
        
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,1fr)]">
          <EventOverview event={event} />
          <BookingPanel
            event={event}
            tickets={tickets}
            booking={booking}
            onIncrease={() =>
              setTickets((value) =>
                Math.min(value + 1, event.availableTickets)
              )
            }
            onDecrease={() => setTickets((value) => Math.max(value - 1, 1))}
            onBook={book}
          />
        </div>
      </main>
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,1fr)]">
          <div className="h-125 animate-pulse rounded-3xl bg-slate-200" />
          <div className="space-y-5">
            <div className="h-10 animate-pulse rounded bg-slate-200" />
            <div className="h-24 animate-pulse rounded bg-slate-200" />
            <div className="h-48 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Unavailable({ message }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Ticket className="text-red-500" size={28} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Event unavailable
        </h1>
        <p className="mt-2 text-slate-500">
          {message || "We couldn't find this event."}
        </p>
        <Link
          to="/customer/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
        >
          <ArrowLeft size={17} />
          Back to events
        </Link>
      </div>
    </div>
  );
}