// JobSeekerLogin.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';

const JobSeekerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // Redirect or handle success as needed
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle errors
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-4 pb-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-2">
                <h2 className="text-2xl font-semibold mb-6">Job Seeker Login</h2>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign In</button>
                </form>
                <div className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register-JobSeeker" className="text-blue-500 hover:text-blue-600">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerLogin;
