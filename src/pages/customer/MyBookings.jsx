import { useCallback, useEffect, useState } from "react";
import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyBookings } from "../../services/bookingService";
import BookingCard from "../../components/customer/BookingCard";
import { PageHeader } from "../../components/common/ui";

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
      const message =
        err.response?.data?.message || "Unable to load your bookings.";
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
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Your tickets"
          title="My bookings"
          description="Keep track of all your event bookings and tickets in one place."
        />

        {!loading && !error && bookings.length > 0 && (
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Total bookings" value={bookings.length} />
            <Stat label="Confirmed" value={confirmed} accent="text-emerald-600" />
            <Stat label="Tickets booked" value={tickets} accent="text-indigo-600" />
          </div>
        )}

        {loading && (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {!loading && error && <Message error={error} retry={fetchBookings} />}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
            <Ticket size={28} className="mx-auto text-indigo-600" />
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

function Stat({ label, value, accent = "text-slate-900" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-black ${accent}`}>{value}</p>
    </div>
  );
}

function Message({ error, retry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center">
      <h2 className="text-xl font-bold text-red-800">
        Unable to load bookings
      </h2>
      <p className="mt-2 text-sm text-red-600">{error}</p>
      <button
        type="button"
        onClick={retry}
        className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}