import { MenuItem } from "@mui/material";

const StripeButton = ({ onboarded }) => {
  const handleOnboardClick = async () => {
    try {
      let route = "/client/dashboard";
      if (!onboarded) {
        route = "/client/onboard";
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // redirect to Stripe
      const data = await response.json();
      window.open(data.url, "_blank").focus();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <MenuItem variant="contained" color="primary" onClick={handleOnboardClick}>
      {onboarded ? "Stripe Dashboard" : "Stripe Onboard"}
    </MenuItem>
  );
};

export default StripeButton;
