import React, { useEffect, useState } from "react";
import axios from "axios";

function DistributedTasks() {
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch distributed tasks grouped by agent
  useEffect(() => {
    const fetchDistributed = async () => {
      try {
        const token = localStorage.getItem("token");
        const endpoint = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/lists/distributed-tasks`;
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const grouped = response.data.reduce((acc, task) => {
          const agentId = task.assignedTo._id;
          const agentName = task.assignedTo.name;

          if (!acc[agentId]) {
            acc[agentId] = { agentId, agentName, tasks: [] };
          }

          // Check for duplicates based on firstName, phone, and notes
          const isDuplicate = acc[agentId].tasks.some(
            (t) =>
              t.firstName === task.firstName &&
              t.phone === task.phone &&
              t.notes === task.notes
          );

          if (!isDuplicate) {
            acc[agentId].tasks.push({
              firstName: task.firstName,
              phone: task.phone,
              notes: task.notes,
            });
          }

          return acc;
        }, {});

        setGroupedData(Object.values(grouped));
        setLoading(false);
      } catch (err) {
        setError("Failed to load distributed tasks");
        setLoading(false);
      }
    };

    fetchDistributed();
  }, []);

  // Render loading state, error, or grouped data
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-600 font-semibold text-lg">
          Loading tasks...
        </p>
      </div>
    );

  
  if (error)
    return (
      <div className="flex">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen max-w-5xl mx-auto w-full">
          <p className="text-base sm:text-lg font-semibold text-red-500">
            {error}
          </p>
        </main>
      </div>
    );

  return (
    <div className="flex bg-gray-50">
     
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 max-w-7xl mx-auto w-full transition-all duration-300">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Distributed Tasks by Agent
        </h2>
        {groupedData.map((agentGroup) => (
          <section
            key={agentGroup.agentId}
            className="mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-3 sm:mb-4">
              Agent: {agentGroup.agentName}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] sm:min-w-[600px] border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-indigo-900">
                      First Name
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-indigo-900">
                      Phone
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold text-indigo-900">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agentGroup.tasks.map((task, index) => (
                    <tr
                      key={index}
                      className="hover:bg-indigo-50 transition-colors duration-150"
                    >
                      <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                        {task.firstName}
                      </td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                        {task.phone}
                      </td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 border-b border-gray-200">
                        {task.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default DistributedTasks;
