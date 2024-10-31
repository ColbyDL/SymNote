import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, title, placeholder }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    if(inputValue.length == 0) {
        alert("Please enter a Name")
        return;
    }
    onSubmit(inputValue);
    setInputValue(''); // Reset input
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">{title}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <div className="flex justify-between">
          <button onClick={handleSubmit} className="btn-primary">
            Submit
          </button>
          <button onClick={onClose} className="btn-primary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
