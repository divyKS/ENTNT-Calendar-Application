import React, { useState } from 'react';
import axios from 'axios';

const LogCommunication = ({ companyId, onClose }) => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({
                companyId,
                type,
                date,
                notes,
            })
            await axios.post('http://localhost:3500/api/user/log-communication', {
                companyId,
                type,
                date,
                notes,
            });
            alert('Communication logged successfully');
            onClose();
        } catch (err) {
            alert('Failed to log communication.');
        }
    };

    return (
        <div className="modal">
            <h3>Log Communication</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Notes:
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default LogCommunication;
