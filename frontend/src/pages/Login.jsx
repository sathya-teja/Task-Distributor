import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // State for error and success messages
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // Toggle between login and registration
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/auth/${
      isRegister ? "register-admin" : "login"
    }`;
    console.log(endpoint);
    try {
      // 
      const res = await axios.post(endpoint, formData);
      if (!isRegister) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        setMessage("Registration successful. You can now log in.");
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-fuchsia-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isRegister ? "Register Admin" : "Admin Login"}
        </h2>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-3 text-sm text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-600 mt-3 text-sm text-center">{message}</p>
        )}

        <p className="mt-6 text-center text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setMessage("");
            }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
