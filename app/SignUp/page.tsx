
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      setLoading(true);
      const response = await axios.post("https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/auth/signup", user);
      console.log("Signup success", response.data);
      
      // Show success toast
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setUser({
        username: "",
        email: "",
        password: "",
      });

    } catch (error: any) {
      console.log("Signup failed", error.message);
      // Show error toast
      toast.error(error.response?.data?.detail || "Signup failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={onSignup}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className={`w-full bg-zinc-900 hover:bg-zinc-950 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="./Login" legacyBehavior>
              <a className="text-blue-500 hover:underline">Log in</a>
            </Link>
          </p>
        </div>
      </div>

      {/* Toast container for showing notifications */}
      <ToastContainer />
    </>
  );
}
