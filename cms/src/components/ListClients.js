import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // TODO - needs 500 handling
  const handleAddClient = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/clients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({ email, country }),
      }
    );
    getClients();
    console.log(email);
    if (response.ok === true) {
      console.log(email);
      setOpen(false);
      setEmail("");
    }
  };


  const getClients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/clients`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      ); // TODO - needs 401 and 500 handling
      const parseRes = await response.json();
      setClients(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  if (!clients) {
    return "Loading...";
  }

  return (
    <div>
      <p>Client list</p>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            <Link to={`/client/${client._id}`}>{client.client_email}</Link>
          </li>
        ))}
      </ul>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Client
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a client, please enter their email address and select their
            country.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
          <Select value={country} onChange={handleCountryChange} fullWidth>
            <MenuItem value={"NZ"}>New Zealand</MenuItem>
            <MenuItem value={"AU"}>Australia</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddClient} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListClients;
