import { Link } from "react-router-dom";
import { CalendarDays, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <CalendarDays size={21} />
              </span>
              <span className="text-xl font-black text-white">Evently</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              A calmer way to discover, host, and share the events that bring
              people together.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              <a
                href="mailto:hello@evently.app"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={15} />
                hello@evently.app
              </a>
              <span className="inline-flex items-center gap-2 text-slate-400">
                <Sparkles size={15} />
                Made for memorable moments
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Evently. All rights reserved.</p>
          <p>Plan well. Gather often.</p>
        </div>
      </div>
    </footer>
  );
}