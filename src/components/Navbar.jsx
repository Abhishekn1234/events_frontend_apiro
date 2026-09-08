import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Ticket,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../store/auth";
import ThemeToggle from "./organizer/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const isOrganizer = user?.role === "ORGANIZER";
  const dashboardPath = isOrganizer
    ? "/organizer/dashboard"
    : "/customer/dashboard";

  const urlSearch = searchParams.get("search") || "";

  useEffect(() => {
    setSearch(urlSearch);
    setSearchOpen(Boolean(urlSearch));
  }, [urlSearch]);
    
  const closeMenu = () => setMenuOpen(false);
  
  const handleLogout = () => {
    logout();
    closeMenu();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    const nextParams = new URLSearchParams(searchParams);
    if (query) {
      nextParams.set("search", query);
    } else {
      nextParams.delete("search");
    }
    const queryString = nextParams.toString();
    navigate(`/customer/dashboard${queryString ? `?${queryString}` : ""}`);
    setSearchOpen(Boolean(query));
  };

  const clearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
    setSearch("");
    const queryString = nextParams.toString();
    navigate(`/customer/dashboard${queryString ? `?${queryString}` : ""}`);
    setSearchOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <CalendarDays size={21} />
            </span>
            <span className="text-xl font-black tracking-tight text-slate-950">
              Evently
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" end className={linkClass}>
              Discover
            </NavLink>
            {isAuthenticated && (
              <NavLink to={dashboardPath} className={linkClass}>
                <LayoutDashboard size={16} />
                Dashboard
              </NavLink>
            )}
            {user?.role === "CUSTOMER" && (
              <NavLink to="/customer/my-bookings" className={linkClass}>
                <Ticket size={16} />
                My bookings
              </NavLink>
            )}
            {isOrganizer && (
              <NavLink to="/organizer/events" className={linkClass}>
                My events
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {isOrganizer && <ThemeToggle />}
            {!isOrganizer && (searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center rounded-lg border border-slate-200 bg-white px-2 focus-within:border-indigo-400"
              >
                <Search size={17} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search events"
                  aria-label="Search events"
                  maxLength={100}
                  autoFocus
                  className="w-28 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:w-44"
                />
                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Clear event search"
                    title="Clear event search"
                  >
                    <X size={15} />
                  </button>
                )}
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                aria-label="Search events"
                title="Search events"
              >
                <Search size={18} />
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <User size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isOrganizer ? "Organizer" : "Customer"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 sm:flex"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden px-3 py-2 text-sm font-bold text-slate-700 hover:text-indigo-600 sm:block"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-100 py-3 md:hidden">
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>
              Discover
            </NavLink>
            {isAuthenticated && (
              <NavLink to={dashboardPath} className={linkClass} onClick={closeMenu}>
                <LayoutDashboard size={16} />
                Dashboard
              </NavLink>
            )}
            {user?.role === "CUSTOMER" && (
              <NavLink
                to="/customer/my-bookings"
                className={linkClass}
                onClick={closeMenu}
              >
                <Ticket size={16} />
                My bookings
              </NavLink>
            )}
            {isOrganizer && (
              <NavLink
                to="/organizer/events"
                className={linkClass}
                onClick={closeMenu}
              >
                My events
              </NavLink>
            )}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Log out
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}