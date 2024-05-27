import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const JobSeekerRegister = () => {
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-4 pb-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-2">
                <h2 className="text-2xl font-semibold mb-6">Job Seeker Registration</h2>
                <form className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="country">
                            Country of Residence
                        </label>
                        <Select
                            options={countries}
                            className="mt-1 w-full"
                            defaultValue={countries[0]} // Default country
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/job-seeker/login" className="text-blue-500 hover:text-blue-600">
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerRegister;
