import {useEffect, useState, React} from 'react'
import axios from 'axios'

export default function login() {

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

  return (
    <div>
        <form>
            <h1>Login</h1>
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
                <label for="password">Password</label>
                {" "}
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    </div>
  )
}
