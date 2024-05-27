import React, { useState, useEffect } from 'react';
import { ref, push, set, get, remove } from 'firebase/database';
import { auth, database } from '../../firebase/firebaseConfig';
import AddJobModal from './AddJobModal';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const AddJobs = () => {
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const employerRef = ref(database, `employers/${userId}`);
                    const snapshot = await get(employerRef);
                    if (snapshot.exists()) {
                        const employerData = snapshot.val();
                        setCompanyName(employerData.companyName);
                    }
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error('Error fetching company name:', error);
            }
        };

        const fetchJobs = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const jobsRef = ref(database, `jobs/${userId}`);
                    const snapshot = await get(jobsRef);
                    if (snapshot.exists()) {
                        const jobData = snapshot.val();
                        const jobList = Object.keys(jobData).map(key => ({
                            id: key,
                            ...jobData[key]
                        }));
                        setJobs(jobList);
                    }
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchCompanyName();
        fetchJobs();
    }, []);

    const handleAddJob = async (newJob) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log("User not authenticated");
                return;
            }

            const userId = user.uid;
            const jobWithCompanyName = { ...newJob, companyName };
            const jobRef = push(ref(database, `jobs/${userId}`)); // Add job under user's ID
            await set(jobRef, jobWithCompanyName);

            // Fetch the updated job list from the database
            const snapshot = await get(ref(database, `jobs/${userId}`));
            if (snapshot.exists()) {
                const jobData = snapshot.val();
                const jobList = Object.keys(jobData).map(key => ({
                    id: key,
                    ...jobData[key]
                }));
                setJobs(jobList);
            }

            setShowModal(false);
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log("User not authenticated");
                return;
            }
    
            setShowConfirmation(true);
            setSelectedJob(jobId);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const confirmDeleteJob = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log("User not authenticated");
                return;
            }

            const userId = user.uid;
            const jobRef = ref(database, `jobs/${userId}/${selectedJob}`);
            await remove(jobRef);

            // Fetch the updated job list from the database
            const snapshot = await get(ref(database, `jobs/${userId}`));
            if (snapshot.exists()) {
                const jobData = snapshot.val();
                const jobList = Object.keys(jobData).map(key => ({
                    id: key,
                    ...jobData[key]
                }));
                setJobs(jobList);
            }

            setShowConfirmation(false);
            setSelectedJob(null);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const cancelDeleteJob = () => {
        setShowConfirmation(false);
        setSelectedJob(null);
    };

    return (
        <div>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setShowModal(true)}
            >
                Add Job
            </button>
            {showModal && <AddJobModal onAdd={handleAddJob} onClose={() => setShowModal(false)} />}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg">Are you sure you want to delete this job?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={confirmDeleteJob}>Yes</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={cancelDeleteJob}>No</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4">
                {jobs.map(job => (
                    <div key={job.id} className="bg-blue-500 text-white p-4 rounded shadow-md relative">
                        <h3 className="text-xl font-semibold">{job.position}</h3>
                        <p>Experience: {job.experience}</p>
                        <p>Salary: {job.salary}</p>
                        <p>Location: {job.location}</p>
                        <p>Company: {job.companyName}</p>
                        <div className="absolute top-2 right-2">
                            <FaTrash 
                                onClick={() => handleDeleteJob(job.id)}
                                className="cursor-pointer text-red-500 text-xl" 
                            />
                            <FaPencilAlt 
                                onClick={() => setSelectedJob(job.id)}
                                className="cursor-pointer text-black text-lg ml-2" 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddJobs;
