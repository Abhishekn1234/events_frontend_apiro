
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import { OrganizerThemeProvider } from "./context/OrganizerThemeContext";

export default function App() {
  return (
    <BrowserRouter>
      <OrganizerThemeProvider>
        <AppRoutes />
      </OrganizerThemeProvider>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
          },
        }}
      />

    </BrowserRouter>
  );
}

