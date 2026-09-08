import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, Ticket } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEvents } from "../../services/eventService";
import EventCard from "../../components/customer/EventCard";

const categories = ["All", "Music", "Tech", "Workshop", "Sports", "Other"];

export default function CustomerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestSequence = useRef(0);
  const search = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "All";

  const fetchEvents = useCallback(async () => {
    const requestId = ++requestSequence.current;

    try {
      setLoading(true);
      setError("");
      
      const params = {
        ...(activeCategory !== "All" && { category: activeCategory }),
        ...(search.trim() && { search: search.trim() }),
      };
      
      const data = await getEvents(params);
      if (requestId !== requestSequence.current) return;
      setEvents(data.events || data);
    } catch (err) {
      if (requestId !== requestSequence.current) return;
      const message =
        err.response?.data?.message || "Unable to load events. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      if (requestId === requestSequence.current) setLoading(false);
    }
  }, [activeCategory, search]);

  useEffect(() => {
    const debounceTimer = setTimeout(fetchEvents, 350);

    return () => clearTimeout(debounceTimer);
  }, [fetchEvents]);

  const featuredEvents = useMemo(() => events.slice(0, 3), [events]);

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-slate-950 to-violet-950" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-200">
              <Ticket size={16} />
              Discover amazing experiences
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find your next{" "}
              <span className="block text-indigo-400">unforgettable event.</span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover concerts, technology events, workshops, sports and
              experiences happening around you.
            </p>
            
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              <HeroStat value={loading ? "-" : events.length} label="Events" />
              <HeroStat value="5" label="Categories" />
              <HeroStat value="24/7" label="Booking" />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Explore
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Browse by category
          </h2>
          
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams);
                  if (category === "All") {
                    nextParams.delete("category");
                  } else {
                    nextParams.set("category", category);
                  }
                  setSearchParams(nextParams, { replace: true });
                }}
                className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 ring-2 ring-indigo-600/20 ring-offset-2"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {!loading && !error && featuredEvents.length > 0 && (
          <EventSection
            eyebrow="Featured"
            title="Don't miss these"
            events={featuredEvents}
          />
        )}

        {loading && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-107.5 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <Message
            title="Unable to load events"
            message={error}
            action={fetchEvents}
          />
        )}

        {!loading && !error && events.length === 0 && (
          <Message
            title="No events found"
            message="Try another search term or select a different category."
            action={clearFilters}
            label="Clear filters"
          />
        )}

        {!loading && !error && events.length > featuredEvents.length && (
          <EventSection
            eyebrow="More to explore"
            title="All upcoming events"
            events={events.slice(featuredEvents.length)}
          />
        )}
      </main>
    </div>
  );
}

function HeroStat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}

function EventSection({ eyebrow, title, events }) {
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

function Message({ title, message, action, label = "Try again" }) {
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