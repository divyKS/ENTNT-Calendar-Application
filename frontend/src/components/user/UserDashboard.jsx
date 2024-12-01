import React, { useEffect, useState } from "react";
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { fetchAllNotifications, fetchDashboardData, logCommunication } from "../../api";
import { determineBackgroundColor } from "../../utils";

const UserDashboard = ({ setBadgeCount }) => {
  const [dashboardData, setDashboardData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;

  const nextPage = () => {
    if ((currentPage + 1) * rowsPerPage < dashboardData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        alert("Failed to load dashboard data.");
      }
    };

    loadDashboardData();  }, []);

  const openModal = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany) return;

    try {
      await logCommunication(selectedCompany.companyId, notes);
      closeModal();

      const dashboardData = await fetchDashboardData();
      setDashboardData(dashboardData);

      const notifData = await fetchAllNotifications();
      const total = notifData.overdue.length + notifData.today.length;
      setBadgeCount(total);
    } catch (err) {
      alert("Failed to log communication. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-base font-bold text-gray-700">
                Company Name
              </th>
              <th className="px-6 py-4 text-left text-base font-bold text-gray-700">
                Last Five Communications
              </th>
              <th className="px-6 py-4 text-left text-base font-bold text-gray-700">
                Next Scheduled Communication
              </th>
              <th className="px-6 py-4 text-left text-base font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData
              .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
              .map((company) => (
                <tr
                  key={company.companyId}
                  className="border-b"
                  style={{
                    backgroundColor: determineBackgroundColor(company),
                  }}
                >
                  <td className="px-6 py-4 text-base text-gray-800 font-medium">
                    {company.companyName}
                  </td>

                  <td className="px-6 py-4 text-base text-gray-800">
                    <ul className="flex flex-col gap-1">
                      {company.lastFiveCommunications.map((comm, index) => (
                        <li
                          key={index}
                          title={comm.notes || ""}
                          className="relative group bg-gray-50 pl-2 rounded shadow"
                        >
                          {comm.type} - {new Date(comm.date).toDateString()}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-6 py-4 text-base text-gray-800">
                    {company.lastFiveCommunications.length === 5
                      ? "Communications complete. Nothing Scheduled"
                      : `${company.nextCommunication?.type || "N/A"} - ${
                          company.nextCommunication?.date
                            ? new Date(
                                company.nextCommunication.date,
                              ).toDateString()
                            : "N/A"
                        }`}
                  </td>

                  <td className="px-6 py-4 text-base text-gray-800">
                    <button
                      onClick={() => openModal(company)}
                      disabled={company.lastFiveCommunications.length === 5}
                      className={`px-4 py-2 rounded ${
                        company.lastFiveCommunications.length === 5
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Log Communication
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center m-4 px-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded text-base ${
              currentPage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FaStepBackward />
          </button>
          <p className="text-base text-gray-600">
            Page {currentPage + 1} of{" "}
            {Math.ceil(dashboardData.length / rowsPerPage)}
          </p>
          <button
            onClick={nextPage}
            disabled={(currentPage + 1) * rowsPerPage >= dashboardData.length}
            className={`px-4 py-2 rounded text-base ${
              (currentPage + 1) * rowsPerPage >= dashboardData.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FaStepForward />
          </button>
        </div>
      </div>

      {showModal && selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none text-4xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Log Communication: {selectedCompany.companyName}
            </h2>
            <form onSubmit={handleSubmit}>
              <p className="mb-4  text-gray-600">
                Please write a note of what was discussed in this session.
                <br />
              </p>
              <label className="block mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Notes:
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                  className="p-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
                  placeholder="Enter notes here..."
                />
              </label>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
