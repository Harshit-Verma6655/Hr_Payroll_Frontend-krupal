import React, { useState } from 'react';
import Modal from 'react-modal'; // Ensure you have a modal library installed

const UserModal = ({ isOpen, onClose, onAddUser }) => {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    mobile_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(userData); // Pass data to parent
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false} // Hide app for accessibility
    >
      <h2 className="text-2xl font-semibold mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add User
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default UserModal;
