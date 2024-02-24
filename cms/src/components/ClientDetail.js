import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  //TODO - needs 500 handling
  const getClient = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/clients/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();

      setClient(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }, [id]);

  // TODO - needs 500 handling
  const deleteClient = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/clients/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      if (response.ok) {
        console.log("Client deleted");
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getClient();
  }, [getClient]);

  if (!client) {
    return "Loading...";
  }

  return (
    <div>
      <h1>{client.client_name}</h1>
      <p>Email: {client.client_email}</p>
      <p>Phone: {client.client_phone}</p>
      <p>Country: {client.client_country}</p>
      <button onClick={deleteClient}>Delete Client</button>
    </div>
  );
}

export default ClientDetail;
