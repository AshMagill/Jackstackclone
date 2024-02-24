import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListClients from "./ListClients";

// article components
// import EditProject from "../components/EditProject";
// import ListProjects from "./ListProjects";

const Articles = () => {
  return (
    <div>
      {/* <EditProject />
      <ListProjects /> */}
      <ListClients />
    </div>
  );
};

const AdminDash = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };
  // fetch all clients

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center mt-4">Admin DashBoard</h1>
        <Articles />
      </div>

      <button
        className="btn btn-primary mt-4 mb-4 ml-3 "
        onClick={(e) => logout(e)}
      >
        Logout
      </button>
    </Fragment>
  );
};

export default AdminDash;
