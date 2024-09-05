import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisH } from 'react-icons/fa';

export function DropupMenu({ onWebsiteSelect }) {
    const [websites, setWebsites] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const response = await axios.post('https://flashcard-webapp-five.vercel.app/api/get_cards', {
                    request: {
                        access_token: localStorage.getItem('access_token'),
                        refresh_token: localStorage.getItem('refresh_token')
                    },
                    timestamp: {}
                });
                setWebsites([...new Set(response.data.map(card => card.website))]);
            } catch (error) {
                console.error('Error fetching websites', error);
            }
        };

        fetchWebsites();
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded bg-gray-500 text-white flex items-center space-x-2"
            >
                <FaEllipsisH size={20} />
            </button>
            {showMenu && (
                <div className="absolute top-full right-0 bg-white border border-gray-300 rounded mt-2 shadow-lg z-50">
                    {websites.map((website, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                onWebsiteSelect(website);
                                setShowMenu(false);
                            }}
                        >
                            {website}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
