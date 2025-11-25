import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (username.trim() === "") {
      alert("Username cannot be empty");
      return;
    }

    if (password.trim() === "") {
      alert("Password cannot be empty");
      return;
    }

    // Correct credentials
    if (username === "admin" && password === "company@1") {
      
      // SAVE LOGIN STATUS
      localStorage.setItem("auth", "true");  // <==== REQUIRED

      alert("Login Successful");
      navigate("/home");
    } 
    else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Login</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
