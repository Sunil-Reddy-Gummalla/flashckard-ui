import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputField } from '../components/InputFeild';
import { SubmitButton } from '../components/SubmitButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/toastConfig';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://flashcard-webapp-five.vercel.app/api/login', {
                email,
                password,
            });

            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            showToast('Logged In Successfully!');
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            setLoading(false);
            showToast(error.response?.data?.detail || 'Login failed', 'error');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-80 p-6 bg-white rounded-lg shadow-md relative">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <InputField
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton text="Login" />
                </form>
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                        <div className="loader"></div>
                    </div>
                )}
                <div className="mt-4 text-center text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}
