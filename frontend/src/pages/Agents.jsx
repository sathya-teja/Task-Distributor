import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/agents`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(res.data);
      } catch (err) {
        setError('Failed to load agents');
      }
    };

    if (token) fetchAgents();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/agents`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents([...agents, res.data]);
      setMessage('Agent added successfully');
      setFormData({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding agent');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-10">
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Manage Agents
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6 sm:mb-8 space-y-3 sm:space-y-4"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Add New Agent
          </h3>

          {/* Inputs grid: single column on small, two columns on md and up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="mt-3 sm:mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 w-full sm:w-auto text-sm sm:text-base"
          >
            Add Agent
          </button>

          {/* Feedback messages */}
          {error && <p className="text-red-500 font-semibold mt-2 sm:mt-3 text-sm sm:text-base">{error}</p>}
          {message && <p className="text-green-600 font-semibold mt-2 sm:mt-3 text-sm sm:text-base">{message}</p>}
        </form>

        {/* Agents List */}
<div className="bg-white rounded-xl shadow-md p-3 sm:p-5 overflow-x-auto">
  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Agent List</h3>
  <table className="w-full border-collapse min-w-[320px] sm:min-w-full text-xs sm:text-sm">
    <thead>
      <tr className="bg-purple-500">
        <th className="py-1.5 px-2 sm:py-2 sm:px-3 text-left font-semibold text-white rounded-tl-xl">
          Name
        </th>
        <th className="py-1.5 px-2 sm:py-2 sm:px-3 text-left font-semibold text-white">
          Email
        </th>
        <th className="py-1.5 px-2 sm:py-2 sm:px-3 text-left font-semibold text-white rounded-tr-xl">
          Mobile
        </th>
      </tr>
    </thead>
    <tbody>
      {agents.map((agent) => (
        <tr key={agent._id} className="hover:bg-purple-50 transition-colors duration-150">
          <td className="py-1.5 px-2 sm:py-2 sm:px-3 text-gray-700 border-b border-gray-200">
            {agent.name}
          </td>
          <td className="py-1.5 px-2 sm:py-2 sm:px-3 text-gray-700 border-b border-gray-200">
            {agent.email}
          </td>
          <td className="py-1.5 px-2 sm:py-2 sm:px-3 text-gray-700 border-b border-gray-200">
            {agent.mobile}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </main>
    </div>
  );
};

export default Agents;
