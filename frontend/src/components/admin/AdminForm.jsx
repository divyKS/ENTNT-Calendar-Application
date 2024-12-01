import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const AdminForm = () => {
  const navigate = useNavigate();

  const defaultMethods = [
    {
      method: "LinkedIn Post",
      description: "Post about the company",
      sequence: 1,
      mandatory: true,
    },
    {
      method: "LinkedIn Message",
      description: "Send a message on LinkedIn",
      sequence: 2,
      mandatory: true,
    },
    {
      method: "Email",
      description: "Send an email",
      sequence: 3,
      mandatory: true,
    },
    {
      method: "Phone Call",
      description: "Call the company",
      sequence: 4,
      mandatory: false,
    },
    {
      method: "Other",
      description: "Other means of communication",
      sequence: 5,
      mandatory: false,
    },
  ];

  const [useDefaultMethods, setUseDefaultMethods] = useState(false);

  const [company, setCompany] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: [""],
    phoneNumbers: [""],
    comments: "",
    communicationPeriodicity: "14",
    communications: [{}],
  });

  const handleUseDefaultMethods = (e) => {
    const checked = e.target.checked;
    setUseDefaultMethods(checked);

    if (checked) {
      setCompany({ ...company, communications: defaultMethods });
    } else {
      setCompany({
        ...company,
        communications: [
          { method: "", description: "", sequence: 1, mandatory: false },
        ],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleAddCommunication = () => {
    setCompany({
      ...company,
      communications: [
        ...company.communications,
        {
          method: "",
          description: "",
          sequence: company.communications.length + 1,
          mandatory: false,
        },
      ],
    });
  };

  // for communication methods
  const handleCommunicationChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedCommunications = [...company.communications];
    updatedCommunications[index][name] = type === "checkbox" ? checked : value;
    setCompany({ ...company, communications: updatedCommunications });
  };

  // for changes in any email/phone number
  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...company[field]];
    updatedArray[index] = value;
    setCompany({ ...company, [field]: updatedArray });
  };

  // for removing any email/phone number
  const handleRemoveArrayItem = (type, index) => {
    const updatedArray = company[type].filter((_, i) => i !== index);
    setCompany({ ...company, [type]: updatedArray });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3500/api/admin/add-company",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(company),
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert("Company added successfully");
        setCompany({
          name: "",
          location: "",
          linkedinProfile: "",
          emails: [""],
          phoneNumbers: [""],
          comments: "",
          communicationPeriodicity: "14",
          communications: [
            { method: "", description: "", sequence: 1, mandatory: false },
          ],
        });

        navigate("/admin", { replace: true });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add company");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 m-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Form
            </h2>
            <button
              onClick={() => navigate("/admin")}
              className="text-blue-500 hover:underline mb-4"
            >
              Close
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="block mb-1">
              Company Name
              <input
                name="name"
                value={company.name}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-1">
              Location
              <input
                name="location"
                value={company.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-1">
              LinkedIn Profile
              <input
                name="linkedinProfile"
                value={company.linkedinProfile}
                onChange={handleChange}
                placeholder="LinkedIn Profile"
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Emails</h4>
              {company.emails.map((email, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    value={email}
                    onChange={(e) => handleArrayChange(e, "emails", index)}
                    placeholder="Email"
                    className="p-2 border rounded w-full"
                  />
                  {company.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("emails", index)}
                      className="ml-2 text-red-500"
                    >
                      <FaMinusCircle />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCompany({ ...company, emails: [...company.emails, ""] })
                }
                className="text-green-500"
              >
                <FaPlusCircle /> Add Email
              </button>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Phone Numbers</h4>
              {company.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    value={phone}
                    onChange={(e) =>
                      handleArrayChange(e, "phoneNumbers", index)
                    }
                    placeholder="Phone Number"
                    className="p-2 border rounded w-full"
                  />
                  {company.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem("phoneNumbers", index)
                      }
                      className="ml-2 text-red-500"
                    >
                      <FaMinusCircle />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCompany({
                    ...company,
                    phoneNumbers: [...company.phoneNumbers, ""],
                  })
                }
                className="text-green-500"
              >
                <FaPlusCircle /> Add Phone Number
              </button>
            </div>

            <label className="block mb-1">
              Comments
              <textarea
                name="comments"
                value={company.comments}
                onChange={handleChange}
                placeholder="Comments"
                className="mt-1 p-2 border rounded w-full"
              ></textarea>
            </label>

            <div className="flex items-center mb-4">
              <label className="mr-2">Communication Periodicity</label>
              <input
                name="communicationPeriodicity"
                type="number"
                value={company.communicationPeriodicity}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="e.g., 30 days"
                min={1}
              />
            </div>

            <h4 className="text-lg font-semibold mb-2">
              Communication Methods
            </h4>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={useDefaultMethods}
                onChange={handleUseDefaultMethods}
                className="mr-2"
              />
              <label>Use Default Methods</label>
            </div>
            <table className="min-w-full border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Method</th>
                  <th className="border border-gray-300 p-2">Description</th>
                  <th className="border border-gray-300 p-2">Sequence</th>
                  <th className="border border-gray-300 p-2">Mandatory</th>
                </tr>
              </thead>
              <tbody>
                {company.communications.map((comm, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">
                      <input
                        name="method"
                        value={comm.method}
                        onChange={(e) => handleCommunicationChange(e, index)}
                        placeholder="Method"
                        disabled={useDefaultMethods}
                        required
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        name="description"
                        value={comm.description}
                        onChange={(e) => handleCommunicationChange(e, index)}
                        placeholder="Description"
                        disabled={useDefaultMethods}
                        required
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        name="sequence"
                        type="number"
                        value={comm.sequence}
                        onChange={(e) => handleCommunicationChange(e, index)}
                        disabled={useDefaultMethods}
                        required
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <label>
                        <input
                          name="mandatory"
                          type="checkbox"
                          checked={comm.mandatory}
                          onChange={(e) => handleCommunicationChange(e, index)}
                          disabled={useDefaultMethods}
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Communication Button */}
            {!useDefaultMethods && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAddCommunication}
                  className="text-green-500 flex items-center"
                >
                  <FaPlusCircle className="mr-1" /> Add Communication Method
                </button>
              </div>
            )}

            {/* Centered Save Company Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminForm;
