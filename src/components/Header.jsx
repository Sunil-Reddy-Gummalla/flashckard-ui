import React, { useState } from 'react';
import { FaSignOutAlt, FaEllipsisV } from 'react-icons/fa';
import { AddFlashCardPopup } from './popups/AddFlashCardPopup';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Header({ fetchCards }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <header className="bg-blue-600 text-white p-3 flex items-center justify-between relative">
            <img src={logo} alt='Logo' className='h-10 w-auto' />
            <h1 className="text-xl flex-grow">Flashcard Generator</h1>
            
            <div className="hidden md:flex space-x-2">
                <button 
                    onClick={() => setIsPopupOpen(true)}
                    className="bg-green-500 text-white p-2 rounded flex items-center space-x-2"
                >
                    <span>Add New Flashcard</span>
                </button>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white p-2 rounded flex items-center space-x-2"
                >
                    <FaSignOutAlt size={20} />
                    <span>Logout</span>
                </button>
            </div>

            <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <FaEllipsisV size={24} />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-14 right-4 bg-white text-black rounded shadow-lg p-2 md:hidden z-50">
                    <button 
                        onClick={() => setIsPopupOpen(true)}
                        className="block w-full text-left p-2 hover:bg-gray-200"
                    >
                        Add New Flashcard
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="block w-full text-left p-2 hover:bg-gray-200"
                    >
                        Logout
                    </button>
                </div>
            )}

            {isPopupOpen && (
                <AddFlashCardPopup onClose={() => {setIsPopupOpen(false); fetchCards();}} />
            )}
        </header>
    );
}
