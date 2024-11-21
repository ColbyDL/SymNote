import React, { useEffect } from 'react';

const MoveModal = ({ isOpen, onClose, onSubmit, title, folders, selectedFolder, setSelectedFolder }) => {
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = () => {
    if (!selectedFolder) {
      setErrorMessage("Please select a destination folder");
      return;
    }
    onSubmit();
    setErrorMessage(""); // Reset error
    onClose(); // Close the modal
  };

  useEffect(() => {
    if (!isOpen) {
      setErrorMessage(""); // Reset error when modal closes
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">{title}</h2>
        
        {/* Dropdown for selecting a folder */}
        <select
          className="bg-white/20 text-black rounded-md px-4 py-2 cursor-pointer w-full"
          value={selectedFolder || ""}
          onChange={(e) => setSelectedFolder(e.target.value)}
        >
          <option value="" disabled>Select destination folder</option>
          {folders?.map((folder) => (
            <option key={folder._id} value={folder._id}>
              {folder.name}
            </option>
          ))}
        </select>
        
        {/* Display error message if no folder is selected */}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <div className="flex justify-between mt-4">
          <button onClick={handleSubmit} className="btn-primary">Submit</button>
          <button onClick={onClose} className="btn-primary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MoveModal;
