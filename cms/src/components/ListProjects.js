import React, { Fragment, useState, useEffect } from "react";
import env from "react-dotenv";

const host = env.HOST || "http://localhost";
const port = env.SERVER_PORT;

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  // console.log(projects[0]);

  // delete project function
  async function deleteProject(id) {
    try {
      const response = await fetch(`${host}:${port}/dashboard/projects/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      if (response.ok === false) {
        alert("Project did not delete");
        return;
      }
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // get all projects
  async function getProjects() {
    // const res = await fetch(`${host}:${port}/dashboard/projects`);
    // const projectArray = await res.json();
    // setProjects(projectArray);
    try {
      const response = await fetch(`${host}:${port}/dashboard/projects`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      if (response.status !== 200) {
        window.location = "/login";
      }
      const parseRes = await response.json();

      setProjects(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center">Existing Projects</h2>
      <table className="table-striped w-100 mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th style={{ padding: "2rem" }}>Address</th>
            <th style={{ padding: "1rem" }}>Description</th>
            <th style={{ padding: "1rem" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="pl-2">{project.title}</td>
              <td style={{ padding: "2rem" }}>{project.website_url}</td>
              <td style={{ padding: "1rem" }}>{project.description}</td>
              <td>
                <img
                  className="p-1"
                  height="80rem"
                  width="80rem"
                  src={`data:${project.imageType};base64,${project.imageData}`}
                  alt={project.title}
                  style={{ marginRight: "1rem" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProject(project._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListProjects;
