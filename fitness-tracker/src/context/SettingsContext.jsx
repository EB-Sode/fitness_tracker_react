import { createContext, useEffect, useState } from "react";
import Settings from "../components/Setting.jsx";


const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("notifications", notifications);
  }, [theme, language, notifications]);

  // Apply theme to the document body
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, language, setLanguage, notifications, setNotifications }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;