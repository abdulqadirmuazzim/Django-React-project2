import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // form logic
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const name = method === "login" ? "Login" : "Register";
  const divStyle = { "max-width": "400px" };

  return (
    <>
      <div className="container mt-5" style={divStyle}>
        <form onSubmit={handleSubmit} className="shadow p-3 mb-5">
          <h4 className="mb-4 text-center">{name}</h4>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            {/* USERNAME INPUT */}
            <input
              className="form-control form-control-sm"
              id="username"
              placeholder="Enter username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              className="form-control form-control-sm"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loading ? (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Form;
