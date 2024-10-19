"use client";

import Link from 'next/link';
import Navbar from '../components/navbar';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Added ToastContainer for showing notifications
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the styles
import qs from 'qs'; // Used for serializing the data in x-www-form-urlencoded format

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); // Loading state

    const onChangeForm = (label: string, event: any) => {
        setLoginForm({ ...loginForm, [label]: event.target.value });
    };

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when the form is submitted
        try {
            const response = await axios.post(
                "https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/auth/login",
                qs.stringify(loginForm), // Serialize the data for x-www-form-urlencoded
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            localStorage.setItem("auth_token", response.data.access_token);
            localStorage.setItem("auth_token_type", response.data.token_type);
            toast.success("Logged in successfully!", {
                position: "top-right", // Position the toast in the top-right corner
                autoClose: 3000, // Auto close the toast after 3 seconds
            });
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.detail || "Login failed!", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                onChange={(event) => onChangeForm("username", event)}
                                disabled={loading} // Disable input when loading
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                                onChange={(event) => onChangeForm("password", event)}
                                disabled={loading} // Disable input when loading
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-zinc-900 hover:bg-zinc-950 text-white font-bold py-2 px-4 rounded focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Don't have an account?{' '}
                        <Link href="./SignUp" legacyBehavior>
                            <a className="text-zinc-900 hover:underline">Sign up</a>
                        </Link>
                    </p>
                </div>
            </div>

            {/* Toast container to show the notification */}
            <ToastContainer />
        </>
    );
}
