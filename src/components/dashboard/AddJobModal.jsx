import React, { useState } from 'react';

const AddJobModal = ({ onClose, onAdd }) => {
    const [position, setPosition] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = () => {
        const newJob = {
            position,
            experience,
            salary,
            location
        };
        onAdd(newJob);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Add Job</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Job Position</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        value={position} 
                        onChange={(e) => setPosition(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        value={experience} 
                        onChange={(e) => setExperience(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddJobModal;
