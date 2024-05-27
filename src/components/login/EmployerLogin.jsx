import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const EmployerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // If successful, user is authenticated
            const user = userCredential.user;
            console.log('User logged in successfully:', user);
            // Redirect to dashboard after successful login
            navigate('/dashboard-Employer');
        } catch (error) {
            // Handle authentication errors
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else {
                // Handle other errors
                setError('Login failed. Please check your credentials.');
            }
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-4 pb-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-2">
                <h2 className="text-2xl font-semibold mb-6">Employer Login</h2>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign In</button>
                </form>
                <div className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register-Employer" className="text-blue-500 hover:text-blue-600">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default EmployerLogin;
