import { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SignUp = () => {
  const { setIsAuthenticated, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "", // new state field for the confirmation password
  });

  const { email, password, confirmPassword } = inputs; // include confirmPassword here

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const body = { email, password };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      // TODO need  401 handling
      const data = await response.json();

      if (!response.ok) {
        alert(data.message); // Set the error message in the state
        return;
      } else {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(data.isAuthenticated);
        setIsAdmin(data.isAdmin);
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Sign Up</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default SignUp;
