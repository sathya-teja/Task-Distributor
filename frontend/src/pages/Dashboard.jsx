import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaUser, FaTasks } from "react-icons/fa";

function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch agents and tasks on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch agents
        const agentRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/agents`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAgents(agentRes.data);

        // Fetch tasks
        const taskRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/lists/distributed-tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(taskRes.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    
    // Only fetch data if token exists
    if (token) fetchData();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50 min-w-0">
      <main className="flex-1 min-w-0 p-2 sm:p-4 md:p-6 lg:p-10 bg-gray-50 max-w-7xl mx-auto w-full transition-all duration-300">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Dashboard
        </h2>

        {error && (
          <p className="text-red-500 font-semibold mb-4 sm:mb-6">{error}</p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md flex items-center space-x-3 sm:space-x-4 hover:shadow-lg transition-shadow duration-200">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
              <FaUser className="text-purple-600 text-lg sm:text-xl" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Total Agents
              </h3>
              <p className="mt-1 text-xl sm:text-2xl font-bold text-purple-600">
                {agents.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md flex items-center space-x-3 sm:space-x-4 hover:shadow-lg transition-shadow duration-200">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
              <FaTasks className="text-blue-600 text-lg sm:text-xl" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Total Tasks
              </h3>
              <p className="mt-1 text-xl sm:text-2xl font-bold text-blue-600">
                {tasks.length}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Agents List
          </h3>

          <div className="w-full overflow-x-auto lg:overflow-visible">
            <table className="w-full table-auto border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-purple-500">
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-white rounded-tl-xl">
                    #
                  </th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-white">
                    Name
                  </th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-white">
                    Email
                  </th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-white rounded-tr-xl">
                    Mobile
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <tr
                    key={agent._id || index}
                    className="hover:bg-purple-50 transition-colors duration-150"
                  >
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                      {agent.name}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                      {agent.email}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                      {agent.mobile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
