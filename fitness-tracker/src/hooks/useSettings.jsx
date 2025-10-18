import SettingsContext from "../context/SettingsContext"
import { useContext } from "react";

export const useSettings = () => {
  return useContext(SettingsContext);
}
