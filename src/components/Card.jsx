import React, { useState } from 'react';
import axios from 'axios';

export function Card({ item, refreshCards }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editedText, setEditedText] = useState(item.selected_text);
    const [editedGeneratedText, setEditedGeneratedText] = useState(item.generated_text);
    const [editedUrl, setEditedUrl] = useState(item.url);

    const handleEdit = async () => {
        const request = {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token')
        };

        const data = {
            id: item.id,
            selected_text: editedText,
            generated_text: editedGeneratedText,
            url: editedUrl,
            timestamp: item.timestamp,
            is_starred: item.is_starred
        };

        try {
            await axios.post('https://flashckard-backend.vercel.app/api/edit', { request, data });
            setIsEditing(false);
            refreshCards(); // Refresh the cards after editing
        } catch (error) {
            console.error('Error editing card', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            const request = {
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token')
            };

            const data = {
                id: item.id
            };

            try {
                await axios.post('https://flashckard-backend.vercel.app/api/delete', { request, data });
                refreshCards(); // Refresh the cards after deleting
            } catch (error) {
                console.error('Error deleting card', error);
            }
        }
    };

    const handleStarToggle = async () => {
        const request = {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token')
        };

        const data = {
            id: item.id,
            selected_text: item.selected_text,
            generated_text: item.generated_text,
            url: item.url,
            timestamp: item.timestamp,
            is_starred: !item.is_starred // Toggle the star status
        };

        try {
            await axios.post('https://flashckard-backend.vercel.app/api/edit', { request, data });
            refreshCards(); // Refresh the cards after starring
        } catch (error) {
            console.error('Error toggling star', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
            <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
                <h3 className="text-xl font-bold text-white mb-2">
                    {item.selected_text}
                    <span
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click event from bubbling up
                            handleStarToggle();
                        }}
                        className={`ml-2 cursor-pointer text-sm font-semibold ${item.is_starred ? 'text-yellow-400' : 'text-white text-opacity-80'}`}
                    >
                        {item.is_starred ? '★' : '☆'}
                    </span>
                </h3>
                {isExpanded && (
                    <div>
                        <p className="text-white text-opacity-90">{item.generated_text}</p>
                        <a
                            href={item.url}
                            className="text-white font-semibold mt-4 block underline hover:text-yellow-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            source
                        </a>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-white text-opacity-75">
                                {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                            <div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isEditing && (
                <div>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full mb-2 p-2 rounded"
                    />
                    <textarea
                        value={editedGeneratedText}
                        onChange={(e) => setEditedGeneratedText(e.target.value)}
                        className="w-full mb-2 p-2 rounded"
                    />
                    <input
                        type="text"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                        className="w-full mb-2 p-2 rounded"
                    />
                    <button
                        onClick={handleEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
