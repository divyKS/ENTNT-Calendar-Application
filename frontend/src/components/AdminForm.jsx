import React, { useEffect, useState } from 'react';
import { deleteCompany, fetchCompanies } from '../api';
import { useNavigate } from "react-router";

const AdminForm = () => {
    
    const defaultMethods = [
        { method: 'LinkedIn Post', description: 'Post about the company', sequence: 1, mandatory: true },
        { method: 'LinkedIn Message', description: 'Send a message on LinkedIn', sequence: 2, mandatory: true },
        { method: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
        { method: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
        { method: 'Other', description: 'Other means of communication', sequence: 5, mandatory: false },
    ];

    const [useDefaultMethods, setUseDefaultMethods] = useState(false);
    
    const [company, setCompany] = useState({
        name: '',
        location: '',
        linkedinProfile: '',
        emails: [''],
        phoneNumbers: [''],
        comments: '',
        communicationPeriodicity: '14',
        communications: [...defaultMethods],
    });

    const handleUseDefaultMethods = (e) => {
        const checked = e.target.checked;
        setUseDefaultMethods(checked);

        if (checked) {
            // Populate default methods and disable further modifications
            setCompany({ ...company, communications: defaultMethods });
        } else {
            // Clear the default methods, allowing manual input
            setCompany({ ...company, communications: [{ method: '', description: '', sequence: 1, mandatory: false }] });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
    };

    const handleArrayChange = (e, field, index) => {
        const { value } = e.target;
        const updatedArray = [...company[field]];
        updatedArray[index] = value;
        setCompany({ ...company, [field]: updatedArray });
    };

    const handleAddCommunication = () => {
        setCompany({
            ...company,
            communications: [
                ...company.communications,
                { method: '', description: '', sequence: company.communications.length + 1, mandatory: false },
            ],
        });
    };

    const handleCommunicationChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const updatedCommunications = [...company.communications];
        updatedCommunications[index][name] =
            type === 'checkbox' ? checked : value;
        setCompany({ ...company, communications: updatedCommunications });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3500/api/admin/add-company', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(company),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Company added successfully');
                setCompany({
                    name: '',
                    location: '',
                    linkedinProfile: '',
                    emails: [''],
                    phoneNumbers: [''],
                    comments: '',
                    communicationPeriodicity: '14',
                    communications: [
                        { method: '', description: '', sequence: 1, mandatory: false },
                    ],
                });
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add company');
        }
    };

    return (
        <>
            <div>
                <h2>Admin Page</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Company Details</h3>
                    <input name="name" value={company.name} onChange={handleChange} placeholder="Company Name" required />
                    <input name="location" value={company.location} onChange={handleChange} placeholder="Location" required />
                    <input name="linkedinProfile" value={company.linkedinProfile} onChange={handleChange} placeholder="LinkedIn Profile" required />

                    {company.emails.map((email, index) => (
                        <input key={index} value={email} onChange={(e) => handleArrayChange(e, 'emails', index)} placeholder="Email" />
                    ))}
                    <button type="button" onClick={() => setCompany({ ...company, emails: [...company.emails, ''] })}>
                        Add Email
                    </button>

                    {company.phoneNumbers.map((phone, index) => (
                        <input key={index} value={phone} onChange={(e) => handleArrayChange(e, 'phoneNumbers', index)} placeholder="Phone Number" />
                    ))}
                    <button type="button" onClick={() => setCompany({ ...company, phoneNumbers: [...company.phoneNumbers, ''] })}>
                        Add Phone Number
                    </button>

                    <textarea name="comments" value={company.comments} onChange={handleChange} placeholder="Comments" />

                    <input name="communicationPeriodicity" type="number" value={company.communicationPeriodicity} onChange={handleChange} />

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={useDefaultMethods}
                                onChange={handleUseDefaultMethods}
                            />
                            Use Default Methods
                        </label>

                        {company.communications.map((comm, index) => (
                            <div key={index} className="communication-method">
                                <input
                                    name="method"
                                    value={comm.method}
                                    onChange={(e) => handleCommunicationChange(e, index)}
                                    placeholder="Method"
                                    disabled={useDefaultMethods} // Disable when default methods are used
                                    required
                                />
                                <input
                                    name="description"
                                    value={comm.description}
                                    onChange={(e) => handleCommunicationChange(e, index)}
                                    placeholder="Description"
                                    disabled={useDefaultMethods} // Disable when default methods are used
                                    required
                                />
                                <input
                                    name="sequence"
                                    type="number"
                                    value={comm.sequence}
                                    onChange={(e) => handleCommunicationChange(e, index)}
                                    placeholder="Sequence"
                                    disabled={useDefaultMethods} // Disable when default methods are used
                                    required
                                />
                                <label>
                                    Mandatory:
                                    <input
                                        name="mandatory"
                                        type="checkbox"
                                        checked={comm.mandatory}
                                        onChange={(e) => handleCommunicationChange(e, index)}
                                        disabled={useDefaultMethods} // Disable when default methods are used
                                    />
                                </label>
                        </div>
                ))}

                {/* Add Communication Button */}
                {!useDefaultMethods && (
                    <button type="button" onClick={handleAddCommunication}>
                        Add Communication Method
                    </button>
                )}
                    </div>

                    <button type="submit">Save Company</button>
                </form>
            </div>
            <CompaniesList />
        </>
    );
};

const CompaniesList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/admin/edit-company/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            try {
                await deleteCompany(id);
                fetchCompanies(); // Refresh the list after deletion
            } catch (error) {
                alert('Failed to delete company.');
            }
        }
    };

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const data = await fetchCompanies();
                setCompanies(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load companies.');
                setLoading(false);
            }
        };

        getCompanies();
    }, []);

    if (loading) {
        return <p>Loading companies...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Companies List</h2>
            {companies.length === 0 ? (
                <p>No companies available.</p>
            ) : (
                <ul>
                    {companies.map((company) => (
                        <li key={company._id}>
                            <strong>{company.name}</strong> - {company.location}
                            <button onClick={() => handleEdit(company._id)}>Edit</button>
                            <button onClick={() => handleDelete(company._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default AdminForm;
