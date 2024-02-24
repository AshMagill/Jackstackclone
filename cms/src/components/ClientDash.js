import { useState, useEffect } from "react";
import Products from "./Products";
import ClientHeader from "./ClientHeader";

//modals
import OnboardingCheckPopup from "./modals/OnboardAlert";

const ClientDash = () => {
  const [client, setClient] = useState(null);

  const fetchClient = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/client/account`,
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
  };

  useEffect(() => {
    fetchClient();
  }, []);

  if (!client) {
    return "Loading...";
  }

  return (
    <div>
      <OnboardingCheckPopup onboarded={client.oboarded} />
      <ClientHeader onboarded={client.oboarded} name={client.name} />
      <Products />
    </div>
  );
};

export default ClientDash;
