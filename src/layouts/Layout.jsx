
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthStore from "../store/auth";
import { useOrganizerTheme } from "../context/OrganizerThemeContext";

export default function Layout({ children }) {
  const user = useAuthStore((state) => state.user);
  const { theme } = useOrganizerTheme();
  const isOrganizer = user?.role === "ORGANIZER";

  return (
    <div
      className="flex min-h-screen flex-col bg-[#f5f7fb]"
      data-organizer-theme={isOrganizer ? theme : undefined}
    >

      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  );
}
