import axios from "axios";
import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router";

export default function Registration() {

    let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        await axios.post("http://localhost:8080/user", user);
        navigate("/");
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    }
  };

  return (
    <div >
      <h1>Registration</h1>
      <form onSubmit={(e) => onSubmit(e)} className="scroll-container">
        <div className="form-group">
          <label for="username">Username</label>
          {" "}
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => onInputChange(e)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}