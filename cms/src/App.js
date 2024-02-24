import { useContext, useEffect } from "react";
import { AuthContext } from "./components/AuthContext";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import AdminDash from "./components/AdminDash";
import ClientDash from "./components/ClientDash";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ClientDetail from "./components/ClientDetail";

function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={isAdmin ? <AdminDash /> : <ClientDash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/client/:id" element={<ClientDetail />} />
      </Routes>
    </div>
  );
}

export default App;
