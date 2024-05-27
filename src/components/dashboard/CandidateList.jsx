import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';

const CandidateList = ({ jobId }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const candidatesRef = ref(database, `jobs/${jobId}/applicants`);
                const snapshot = await get(candidatesRef);
                if (snapshot.exists()) {
                    setCandidates(snapshot.val());
                }
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, [jobId]);

    return (
        <div className="bg-white rounded-md p-6">
            <h2 className="text-lg font-semibold mb-4">Candidate List</h2>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Position</th>
                        <th className="text-left">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td className="text-gray-700">{candidate.name}</td>
                            <td className="text-gray-700">{candidate.position}</td>
                            <td className="text-gray-700">{candidate.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateList;
