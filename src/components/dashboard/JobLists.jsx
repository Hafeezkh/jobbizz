import React, { useState, useEffect } from 'react';
import { ref, get, push } from 'firebase/database';
import { auth, database } from '../../firebase/firebaseConfig';
import { Transition } from '@headlessui/react'; // Import Transition from Headless UI for button animation

const JobLists = () => {
    const [jobs, setJobs] = useState([]); // State to store fetched jobs
    const [loading, setLoading] = useState(true); // Initialize loading state as true
    const [appliedJobs, setAppliedJobs] = useState([]); // State to store IDs of applied jobs

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const jobsRef = ref(database, 'jobs');
                    const snapshot = await get(jobsRef);
                    if (snapshot.exists()) {
                        const jobData = snapshot.val();
                        const jobList = Object.keys(jobData).map(userKey => {
                            return Object.keys(jobData[userKey]).map(jobKey => ({
                                id: jobKey,
                                ...jobData[userKey][jobKey]
                            }));
                        }).flat();
                        setJobs(jobList); // Update jobs state
                    } else {
                        console.log("No jobs found");
                    }
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching is done or if there's an error
            }
        };

        fetchJobs();
    }, []);

    // Function to handle applying for a job
// Function to handle applying for a job
const applyForJob = async (jobId) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const userRef = ref(database, `jobSeekers/${userId}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userName = userData.firstName || 'Anonymous'; // Get user's first name or use 'Anonymous' if not available
                const userEmail = user.email || 'N/A'; // Get user's email or use 'N/A' if not available
                const userLocation = userData.country || 'N/A'; // Get user's location from profile or use 'N/A' if not available
                
                // Find the job with the matching ID
                const job = jobs.find(job => job.id === jobId);
                if (job) {
                    const jobPosition = job.position || 'N/A'; // Get job position or use 'N/A' if not available
                    const companyName = job.companyName || 'N/A'; // Get company name or use 'N/A' if not available
                    const applicantData = {
                        name: userName,
                        email: userEmail,
                        location: userLocation,
                        companyName: companyName,
                        position: jobPosition
                    };
                    const applicantRef = ref(database, `jobs/${jobId}/applicants`);
                    await push(applicantRef, applicantData);
                    setAppliedJobs([...appliedJobs, jobId]);
                } else {
                    console.log("Job not found");
                }
            } else {
                console.log("User data not found");
            }
        } else {
            console.log("User not authenticated");
        }
    } catch (error) {
        console.error('Error applying for job:', error);
    }
};

    
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Position
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Experience
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Apply
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap" colSpan="6">
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        jobs.map(job => (
                            <tr key={job.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{job.companyName || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{job.position || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{job.salary || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{job.location || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{job.experience || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Transition
                                        show={!appliedJobs.includes(job.id)}
                                        enter="transition-opacity duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => applyForJob(job.id)}
                                        >
                                            Apply
                                        </button>
                                    </Transition>
                                    <Transition
                                        show={appliedJobs.includes(job.id)}
                                        enter="transition-opacity duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <button
                                            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                                            disabled
                                        >
                                            Applied
                                        </button>
                                    </Transition>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );






    
};

export default JobLists;
