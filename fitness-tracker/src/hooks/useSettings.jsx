import SettingsContext from "../context/SettingsContext.jsx"
import { useContext } from "react";

export const useSettings = () => {
  return useContext(SettingsContext);
}
