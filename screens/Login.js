import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setIsLoading(true); // Start loading

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json(); // Convert response to JSON

      if (json.success) {
        // Save user data to localStorage
        localStorage.setItem("userEmail", credentials.email); // saving it for cart checkout
        
        localStorage.setItem("authToken", json.authToken); // Store auth token
        navigate("/"); // Redirect to homepage
      } else {
        setError(json.message || "Invalid email or password."); // Show backend error
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again later."); // General error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Input change handler
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  // UI for Login
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div className="form-group">
          <label htmlFor="email" className="mb-2">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="mb-2">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-between align-items-center">
          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Logging in..." : "Login"} {/* Button text changes */}
          </button>

          {/* Sign Up Button */}
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate("/createuser")} // Redirect to sign-up page
          >
            New User? Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
