import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const isAuth = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/is-verify`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      if (response.ok) {
        const parseRes = await response.json();
        setIsAuthenticated(parseRes.isAuthenticated);
        setIsAdmin(parseRes.isAdmin);
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isAuth();
  }, [isAuth]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        setIsAuthenticated,
        setIsAdmin,
        logout,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
