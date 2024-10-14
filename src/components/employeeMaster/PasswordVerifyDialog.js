import React, { useState } from 'react';

const PasswordVerifyDialog = ({ onClose, onVerify }) => {
    const [password, setPassword] = useState('');

    const handleVerify = async () => {
        const isValid = await onVerify(password); // Call the parent function to verify password
        if (isValid) {
            onClose(true); // Close dialog and indicate success
        } else {
            alert("Invalid password, please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded shadow-md">
                <h3 className="text-lg font-semibold">Verify Password</h3>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full mt-2"
                />
                <div className="flex justify-end mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={handleVerify}>
                        Verify
                    </button>
                    <button className="bg-gray-300 px-4 py-2" onClick={() => onClose(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordVerifyDialog;
