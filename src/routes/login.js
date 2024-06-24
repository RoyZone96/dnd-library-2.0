import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import { hashPassword } from 'bcryptjs'; // Import your hashing library

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const onInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { username, password }; 
      const response = await axios.post("http://localhost:8080/users/authenticate", user);
      const token = response.data; 
      localStorage.setItem('token', token); 
      alert("Logged in successfully");
      navigate("/");
    } catch (error) {
      alert("Username and/or password is incorrect");
    }
  };

  return (
    <div>
      <form  className="scroll-container" onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => onInputChange(e, setUsername)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => onInputChange(e, setPassword)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
