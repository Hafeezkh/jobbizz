import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../../firebase/firebaseConfig';
import JobLists from './JobLists';

const JobSeekerDashboard = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    setUser(currentUser);
                    const userId = currentUser.uid;
                    const jobSeekerRef = ref(database, `jobSeekers/${userId}`);
                    const snapshot = await get(jobSeekerRef);
                    console.log("Snapshot value:", snapshot.val()); // Log snapshot value
                    if (snapshot.exists()) {
                        const jobSeekerData = snapshot.val();
                        setFirstName(jobSeekerData.firstName);
                        setEmail(currentUser.email);
                        setLocation(jobSeekerData.country); // Update to use 'country'
                    } else {
                        console.log("Job seeker data not found");
                    }
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userId = currentUser.uid;
                const jobSeekerRef = ref(database, `jobSeekers/${userId}`);
                await update(jobSeekerRef, {
                    firstName,
                    location,
                });
                setIsEditing(false);
            } else {
                console.log("User not authenticated");
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login-JobSeeker');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="p-10 ">
            <div className="container mx-auto px-4 py-8 bg-gray-200">
            <div className="container mx-auto px-4 py-8 bg-gray-200">
                <div className="mb-8">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
                    >
                        Logout
                    </button>
                    <h1 className="text-4xl font-semibold mb-4">
                        Welcome,{' '}
                        <span className="text-blue-500">{firstName}</span>
                    </h1>
                    {isEditing ? (
                        <div>
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
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
                {/* Render job list component */}
                
               
                </div>
                
            </div>
            <div className="container mx-auto px-4 py-8 bg-white"> <JobLists /></div>
            
        </div>
    );
};

export default JobSeekerDashboard;
