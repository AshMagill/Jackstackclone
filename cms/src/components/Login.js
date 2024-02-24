import { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { setIsAuthenticated, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      // console.log(body);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (response.status === 401) {
        console.log(data.message);
        alert(data.message); // display the error message
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
      <h1 className="text-center my-5">CreakyDoor Websites</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default Login;
