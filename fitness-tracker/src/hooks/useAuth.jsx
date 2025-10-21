// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ named import!

export const useAuth = () => {
  return useContext(AuthContext);
};
