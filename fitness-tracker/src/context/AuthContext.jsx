import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // stores logged-in user details
  const [loading, setLoading] = useState(true); // prevents flicker on refresh

  // Check login status from localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); //restore data 
    }
    setLoading(false); // done checking storage
  }, []);

  // Mock signup
  const signup = (username, password, email, age, weight) => {
    const newUser = { username, password, email, age, weight, profileImgae: ""};
    localStorage.setItem("user", JSON.stringify(newUser)); // save user in local storage
    setUser(newUser); //save user in state
  };

  // Mock login
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  //Update user profile info
  const updateProfile = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };


  // ✅ Prevent rendering protected routes before checking storage
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
