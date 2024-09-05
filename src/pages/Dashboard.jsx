import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { CardList } from '../components/CardList';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const [cards, setCards] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchWebsite, setSearchWebsite] = useState('');
    const [sortOrder, setSortOrder] = useState('newFirst');
    const [loading, setLoading] = useState(true);
    const [websites, setWebsites] = useState([]);
    const navigate = useNavigate();

    const clearFilters = () => {
        setSearchText('');
        setSortOrder('newFirst');
        setSearchWebsite('');
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            console.log('session refresh token');
            try {
                const response = await axios.post('https://flashckard-backend.vercel.app/refresh-token', {
                    refresh_token: refreshToken,
                });
                localStorage.setItem('access_token', response.data.access_token);
            } catch (error) {
                console.log(error);
                navigate('/login');
                console.error('Error refreshing token:', error);
            }
        }
    };

    const fetchCards = async () => {
        setLoading(true);
        try {
            const request = {
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token')
            };
            const timestamp = {};
            const response = await axios.post('https://flashcard-webapp-five.vercel.app/api/get_cards', {
                request,
                timestamp
            });
            setCards(response.data);
            const uniqueWebsites = [...new Set(response.data.map(card => card.url))].map(url => ({
                url,
                display: url.length > 20 ? `${url.slice(0, 20)}...` : url
            }));
            setWebsites(uniqueWebsites);
        } catch (error) {
            if(error.response.data.detail == 'Invalid token') {
                refreshToken();
            }
            console.error('Error fetching cards', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const filteredCards = cards
        .filter(card => 
            card.selected_text.toLowerCase().includes(searchText.toLowerCase()) ||
            card.generated_text.toLowerCase().includes(searchText.toLowerCase()) ||
            card.url.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter(card => 
            !searchWebsite || card.url === searchWebsite
        )
        .sort((a, b) => {
            if (sortOrder === 'newFirst') {
                return new Date(b.timestamp) - new Date(a.timestamp);
            } else {
                return new Date(a.timestamp) - new Date(b.timestamp);
            }
        });

    return (
        <div className="flex flex-col min-h-screen">
            <Header fetchCards={fetchCards} />
            <main className="flex-1 p-4">
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    websites={websites}
                    searchWebsite={searchWebsite}
                    setSearchWebsite={setSearchWebsite}
                    clearAllFilters={clearFilters}
                />
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <CardList items={filteredCards} refreshCards={fetchCards} />
                )}
            </main>
            <ToastContainer />
        </div>
    );
}
