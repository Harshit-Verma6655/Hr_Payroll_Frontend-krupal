import React from 'react';

const ConfirmDeleteDialog = ({ message, onDelete, onCancel, isOpen }) => {
    if (!isOpen) return null; // Don't render if the dialog is not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[300px]">
                <p className="text-lg mb-4">{message || "Are you sure you want to delete this record?"}</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteDialog;
