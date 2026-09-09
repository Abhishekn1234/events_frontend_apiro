import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Ticket } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEventById } from "../../services/eventService";
import { bookEvent } from "../../services/bookingService";
import EventOverview from "../../components/customer/EventOverview";
import BookingPanel from "../../components/customer/BookingPanel";
import { CommonLoading } from "../../components/common/loading";
import { Unavailable } from "../../components/common/unavailable";
import { getApiErrorMessage, MESSAGES } from "../../constants/messages";

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
      const message = getApiErrorMessage(err, MESSAGES.events.detailsLoadFailed);
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
      return toast.error(MESSAGES.bookings.chooseTicket);
    }
    if (event.availableTickets <= 0)
      return toast.error(MESSAGES.bookings.soldOut);
    if (tickets > event.availableTickets)
      return toast.error(MESSAGES.bookings.insufficientTickets);
    
    try {
      setBooking(true);
      await bookEvent(event._id, tickets);
      toast.success(MESSAGES.bookings.confirmed);
      navigate("/customer/my-bookings");
    } catch (err) {
      toast.error(getApiErrorMessage(err, MESSAGES.bookings.bookingFailed));
      fetchEvent();
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <CommonLoading />;
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


