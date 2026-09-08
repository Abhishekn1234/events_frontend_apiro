import { Moon, Sun } from "lucide-react";
import { useOrganizerTheme } from "../../context/OrganizerThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useOrganizerTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold transition hover:border-indigo-300 hover:text-indigo-400 ${
        theme === "quiet"
          ? "border-slate-600 bg-slate-800 text-slate-200"
          : "border-slate-200 bg-white text-slate-600"
      }`}
      title="Toggle organizer theme"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      {theme === "light" ? "Quiet mode" : "Light mode"}
    </button>
  );
}