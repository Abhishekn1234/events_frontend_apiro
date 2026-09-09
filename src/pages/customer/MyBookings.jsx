import { useCallback, useEffect, useState } from "react";
import { ArrowRight, CalendarCheck, CheckCircle2, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyBookings } from "../../services/bookingService";
import BookingCard from "../../components/customer/BookingCard";
import { PageHeader } from "../../components/common/ui";
import { getApiErrorMessage, MESSAGES } from "../../constants/messages";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyBookings();
      setBookings(data.bookings || data);
    } catch (err) {
      const message = getApiErrorMessage(err, MESSAGES.bookings.loadFailed);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const confirmed = bookings.filter(
    (booking) => booking.bookingStatus === "CONFIRMED"
  ).length;
  
  const tickets = bookings.reduce(
    (total, booking) =>
      booking.bookingStatus === "CONFIRMED"
        ? total + Number(booking.ticketsBooked || 0)
        : total,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <PageHeader
          eyebrow="Your tickets"
          title="My bookings"
          description="Everything you are looking forward to, gathered in one place."
          action={
            <Link
              to="/customer/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto"
            >
              Discover events
              <ArrowRight size={16} />
            </Link>
          }
        />

        {!loading && !error && bookings.length > 0 && (
          <div className="mb-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            <Stat
              label="Total bookings"
              value={bookings.length}
              detail="All reservations"
              icon={CalendarCheck}
              accent="indigo"
            />
            <Stat
              label="Confirmed"
              value={confirmed}
              detail="Ready to attend"
              icon={CheckCircle2}
              accent="emerald"
            />
            <Stat
              label="Tickets booked"
              value={tickets}
              detail="Across confirmed events"
              icon={Ticket}
              accent="amber"
            />
          </div>
        )}

        {loading && (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {!loading && error && <Message error={error} retry={fetchBookings} />}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Ticket size={28} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No bookings yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Discover an event and reserve your tickets.
            </p>
            <Link
              to="/customer/dashboard"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
            >
              Explore events
            </Link>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, detail, icon: Icon, accent }) {
  const accents = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accents[accent]}`}>
          <Icon size={19} />
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-slate-400">{detail}</p>
    </div>
  );
}

function Message({ error, retry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center">
      <h2 className="text-xl font-bold text-red-800">
        {MESSAGES.errors.loadBookingsTitle}
      </h2>
      <p className="mt-2 text-sm text-red-600">{error}</p>
      <button
        type="button"
        onClick={retry}
        className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
      >
        {MESSAGES.actions.retry}
      </button>
    </div>
  );
}