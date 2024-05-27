import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { database, auth } from '../../firebase/firebaseConfig';
import CandidateList from './CandidateList';
import AddJobs from './AddJobs';

const EmployerDashboard = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const employerRef = ref(database, `employers/${userId}`);
                    const snapshot = await get(employerRef);
                    if (snapshot.exists()) {
                        const employerData = snapshot.val();
                        setCompanyName(employerData.companyName);
                        setEmail(employerData.email);
                        setLocation(employerData.country);
                        setCompanyDescription(employerData.companyDescription);
                    } else {
                        console.log("Employer data not found");
                    }
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error('Error fetching employer data:', error);
            }
        };

        fetchCompanyData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const employerRef = ref(database, `employers/${userId}`);
                await update(employerRef, {
                    companyName,
                    country: location,
                    companyDescription,
                });
                setIsEditing(false);
            } else {
                console.log("User not authenticated");
            }
        } catch (error) {
            console.error('Error updating employer data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login-Employer'); // Redirect to the login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="p-10">
            <div className="container mx-auto px-4 py-8 bg-gray-200">
                <div className="mb-8">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
                    >
                        Logout
                    </button>
                    {isEditing ? (
                        <div>
                            <input 
                                type="text" 
                                value={companyName} 
                                onChange={(e) => setCompanyName(e.target.value)} 
                                className="mb-2 w-full px-4 py-2 border rounded"
                            />
                            <textarea 
                                value={companyDescription} 
                                onChange={(e) => setCompanyDescription(e.target.value)} 
                                className="mb-2 w-full px-4 py-2 border rounded"
                            />
                            <input 
                                type="text" 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)} 
                                className="mb-2 w-full px-4 py-2 border rounded"
                            />
                            <button 
                                onClick={handleSave}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Save
                            </button>
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-4xl font-semibold mb-4">{companyName}</h1>
                            <p className="text-lg text-gray-800">{companyDescription}</p>
                            <p className="text-lg text-gray-800">Email: {email}</p>
                            <p className="text-lg text-gray-800">Location: {location}</p>
                            <button 
                                onClick={handleEdit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Post Jobs</h2>
                        <AddJobs />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Candidate List</h2>
                        <CandidateList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
