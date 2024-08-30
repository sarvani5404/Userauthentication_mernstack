import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data before sending request:", formData); // Log form data to console for debugging
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );
      setSuccess(response.data.message);
      setError(null);
      console.log("Response from backend:", response.data); // Log response data to console for debugging

      if (response.data === "success") {
        // Navigate to home page after successful login
        navigate("/home");
      } else {
        setError(response.data);
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error during form submission:", error); // Log error to console for debugging
      setError(
        error.response ? error.response.data.message : "Something went wrong!"
      );
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
                <p>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
