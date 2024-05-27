import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../../firebase/firebaseConfig';
import Select from 'react-select';

const EmployerRegister = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countriesData = data.map(country => ({
                    label: country.name.common,
                    value: country.name.common
                }));
                const sortedCountries = countriesData.sort((a, b) => a.label.localeCompare(b.label));
                setCountries(sortedCountries);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setSuccessMessage('');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Account created successfully:', user.uid);

            const userRef = ref(database, `employers/${user.uid}`);
            await set(userRef, {
                companyName: companyName,
                companyDescription: companyDescription,
                email: email,
                country: country
            });

            setSuccessMessage('Account created successfully!');
            setError('');

            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = '/login-Employer';
            }, 1000); // 3000 milliseconds (3 seconds) delay before redirection

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Email already exists.');
            } else {
                setError('Failed to create account: ' + error.message);
            }
            setSuccessMessage('');
        }
    };

  return (
    <div className="bg-white dark:text-white">
      <div className="min-h-screen flex justify-center items-center">
        <form className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit} data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employer Registration</h2>
          {/* Form fields for company name, email, password, confirm password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyDescription">
                            Company Description
                        </label>
                        <textarea
                            id="companyDescription"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter a brief description of your company"
                            value={companyDescription}
                            onChange={(e) => setCompanyDescription(e.target.value)}
                            required
                        />
                        </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
             Location
            </label>
            <Select
              options={countries}
              className="w-full text-black" // Set dropdown text color to black
              onChange={(option) => setCountry(option.value)}
              placeholder="Select your country"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!error && successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <div className="mt-4 text-gray-700">
            Already have an account? <Link to="/employer/login" className="text-blue-500">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegister;
