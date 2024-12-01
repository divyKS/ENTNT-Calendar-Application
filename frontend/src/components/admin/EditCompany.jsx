import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchCompanies, updateCompany } from "../../api";

const EditCompany = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: [],
    phoneNumbers: [],
    comments: "",
    communicationPeriodicity: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanies();
        const companyData = data.find((c) => c._id === id);
        setCompany(companyData);
        setLoading(false);
      } catch (error) {
        alert("Failed to load company details.");
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, fieldName, index) => {
    const { value } = e.target;
    setCompany((prev) => {
      const updatedArray = [...prev[fieldName]];
      updatedArray[index] = value;
      return { ...prev, [fieldName]: updatedArray };
    });
  };

  const handleAddArrayField = (fieldName) => {
    setCompany((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""],
    }));
  };

  const handleRemoveArrayField = (fieldName, index) => {
    setCompany((prev) => {
      const updatedArray = [...prev[fieldName]];
      updatedArray.splice(index, 1);
      return { ...prev, [fieldName]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompany(id, company);
      navigate("/admin", { replace: true });
    } catch (error) {
      alert("Failed to update company.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Company
            </h2>
            <button
              onClick={() => navigate("/admin")}
              className="text-blue-500 hover:underline mb-4"
            >
              Close
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <label className="block mb-2">
              Location:
              <input
                type="text"
                name="location"
                value={company.location}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <label className="block mb-2">
              LinkedIn:
              <input
                type="text"
                name="linkedinProfile"
                value={company.linkedinProfile}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <fieldset className="mb-4">
              <legend className="font-semibold">Emails:</legend>
              {company.emails.map((email, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleArrayChange(e, "emails", index)}
                    className="p-2 border rounded w-full"
                  />
                  {company.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayField("emails", index)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayField("emails")}
                className="text-green-500 hover:underline"
              >
                Add Email
              </button>
            </fieldset>

            <fieldset className="mb-4">
              <legend className="font-semibold">Phone Numbers:</legend>
              {company.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      handleArrayChange(e, "phoneNumbers", index)
                    }
                    className="p-2 border rounded w-full"
                  />
                  {company.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayField("phoneNumbers", index)
                      }
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayField("phoneNumbers")}
                className="text-green-500 hover:underline"
              >
                Add Phone Number
              </button>
            </fieldset>

            <label className="block mb-2">
              Comments:
              <textarea
                name="comments"
                value={company.comments}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <label className="block mb-2">
              Communication Periodicity:
              <input
                type="number"
                name="communicationPeriodicity"
                value={company.communicationPeriodicity}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
