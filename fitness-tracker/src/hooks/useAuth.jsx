// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ named import!

export const useAuth = () => {
  return useContext(AuthContext);
};
