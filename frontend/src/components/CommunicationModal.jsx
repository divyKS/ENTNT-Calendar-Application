import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility compliance

const CommunicationModal = ({ isOpen, onClose, company }) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Notes:', notes);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Log Communication"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-lg font-bold mb-4">
        Log Communication for {company?.companyName}
      </h2>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Next Communication:</strong>{' '}
          {company?.nextCommunication?.type || 'N/A'} on{' '}
          {company?.nextCommunication?.date
            ? new Date(company.nextCommunication.date).toLocaleDateString()
            : 'N/A'}
        </p>
        <label className="block mt-4">
          Notes:
          <textarea
            className="block w-full border p-2 mt-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
        </label>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CommunicationModal;
