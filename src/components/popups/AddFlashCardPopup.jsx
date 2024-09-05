import React, { useState } from 'react';
import axios from 'axios';
import { showToast } from '../../utils/toastConfig';

export function AddFlashCardPopup({ onClose }) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleGenerate = async () => {
        try {
            const request = {
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token')
            };
            const data = {
                selected_text: title,
                url
            }
            const response = await axios.post('https://flashcard-webapp-five.vercel.app/api/add_card', {
                request, data
            });
            showToast('Flashcard added successfully!');
            onClose();
        } catch (error) {
            showToast(error.response?.data?.detail || 'Failed to add flashcard.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                <h2 className="text-xl mb-4 text-black">Add New Flashcard</h2>
                <label className="block mb-2">
                    <span className="text-gray-700">Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Source URL</span>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                </label>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleGenerate}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Generate
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
