import { createContext, useContext, useEffect, useState } from "react";

const OrganizerThemeContext = createContext(null);

export function OrganizerThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => {
      const savedTheme = localStorage.getItem("evently-organizer-theme");
      return savedTheme === "quiet" ? "quiet" : "light";
    }
  );

  useEffect(() => {
    localStorage.setItem("evently-organizer-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "quiet" : "light"));

  return (
    <OrganizerThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </OrganizerThemeContext.Provider>
  );
}

export function useOrganizerTheme() {
  return useContext(OrganizerThemeContext);
}
