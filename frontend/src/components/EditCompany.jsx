import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { fetchCompanies, updateCompany } from '../api';

const EditCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState({
        name: '',
        location: '',
        linkedinProfile: '',
        emails: [],
        phoneNumbers: [],
        comments: '',
        communicationPeriodicity: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const data = await fetchCompanies();
                const companyData = data.find((c) => c._id === id);
                setCompany(companyData);
                setLoading(false);
            } catch (error) {
                alert('Failed to load company details.');
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
            [fieldName]: [...prev[fieldName], ''],
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
            alert('Company updated successfully');
            navigate('/admin');
        } catch (error) {
            alert('Failed to update company.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <button onClick={()=>navigate('/admin')}>Close</button>
            <form onSubmit={handleSubmit}>
                <h2>Edit Company</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={company.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={company.location}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    LinkedIn:
                    <input
                        type="text"
                        name="linkedIn"
                        value={company.linkedinProfile}
                        onChange={handleChange}
                    />
                </label>
                <fieldset>
                    <legend>Emails:</legend>
                    {company.emails.map((email, index) => (
                        <div key={index}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleArrayChange(e, 'emails', index)}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveArrayField('emails', index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddArrayField('emails')}
                    >
                        Add Email
                    </button>
                </fieldset>
                <fieldset>
                    <legend>Phone Numbers:</legend>
                    {company.phoneNumbers.map((phone, index) => (
                        <div key={index}>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => handleArrayChange(e, 'phoneNumbers', index)}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveArrayField('phoneNumbers', index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddArrayField('phoneNumbers')}
                    >
                        Add Phone Number
                    </button>
                </fieldset>
                <label>
                    Comments:
                    <textarea
                        name="comments"
                        value={company.comments}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Communication Periodicity:
                    <input
                        type="text"
                        name="communicationPeriodicity"
                        value={company.communicationPeriodicity}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </>
    );
};

export default EditCompany;
