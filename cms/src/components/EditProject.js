import React, { useState } from "react";
import env from "react-dotenv";
import Axios from "axios";

const host = env.HOST || "http://localhost";
const port = env.SERVER_PORT;

const EditProject = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [description, setDescription] = useState();

  const send = (event) => {
    const data = new FormData();
    data.append("title", title);
    data.append("file", file);
    data.append("website_url", link);
    data.append("description", description);

    Axios.post(`${host}:${port}/dashboard/projects`, data, {
      headers: { token: localStorage.token },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    //commented this out to stop refreshing for debug
    // TODO - ?change this
    window.location = "/";
  };

  return (
    <div>
      <h3 className="text-center mt-5">Add Projects</h3>
      <form action="#">
        <div className="flex">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            id="title"
            onChange={(event) => {
              const { value } = event.target;
              setTitle(value);
            }}
          />
        </div>
        <div className="flex">
          <label htmlFor="link">Website Address</label>
          <input
            className="form-control"
            type="text"
            id="link"
            onChange={(event) => {
              const { value } = event.target;
              setLink(value);
            }}
          />
        </div>
        <div className="flex">
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            type="text"
            id="description"
            onChange={(event) => {
              const { value } = event.target;
              setDescription(value);
            }}
          />
        </div>
        <div className="flex">
          <label htmlFor="file">Image</label>
          <input
            className="form-control"
            type="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file.size > 16 * 1024 * 1024) {
                // file size is in bytes
                alert("File size exceeds 16MB");
                event.target.value = ""; // clear the selected file
                return;
              }
              setFile(file);
            }}
          />
        </div>
      </form>
      <button className="btn btn-success mt-4" onClick={send}>
        Send
      </button>
    </div>
  );
};

export default EditProject;
