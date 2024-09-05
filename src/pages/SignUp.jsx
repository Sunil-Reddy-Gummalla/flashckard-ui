import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputField } from '../components/InputFeild';
import { SubmitButton } from '../components/SubmitButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/toastConfig';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('https://flashcard-webapp-five.vercel.app/api/register', {
                email,
                password,
                username,
            });

            showToast('Account successfully created!');

            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 1000);
        } catch (error) {
            setLoading(false);
            showToast(error.response?.data?.detail || 'Signup failed', 'error');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-80 p-6 bg-white rounded-lg shadow-md relative">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSignUp}>
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
                    <InputField
                        type="text"
                        placeholder="Enter your User Name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <SubmitButton text="Sign Up" />
                </form>
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                        <div className="loader"></div>
                    </div>
                )}
                <div className="mt-4 text-center text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}
