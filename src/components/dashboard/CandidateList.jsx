import React, { useState } from 'react';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([
        {
            id: 1,
            name: 'John Doe',
            position: 'Software Engineer',
            location: 'New York',
            email: 'john.doe@example.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Data Scientist',
            location: 'San Francisco',
            email: 'jane.smith@example.com'
        },
        {
            id: 3,
            name: 'Michael Johnson',
            position: 'UX Designer',
            location: 'Los Angeles',
            email: 'michael.johnson@example.com'
        },
        {
            id: 4,
            name: 'Emily Brown',
            position: 'Product Manager',
            location: 'Chicago',
            email: 'emily.brown@example.com'
        },
        {
            id: 5,
            name: 'David Wilson',
            position: 'Frontend Developer',
            location: 'Seattle',
            email: 'david.wilson@example.com'
        },
        {
            id: 6,
            name: 'Sarah Davis',
            position: 'Marketing Manager',
            location: 'Boston',
            email: 'sarah.davis@example.com'
        },
        {
            id: 7,
            name: 'Christopher Martinez',
            position: 'Data Analyst',
            location: 'Houston',
            email: 'christopher.martinez@example.com'
        },
        {
            id: 8,
            name: 'Amanda Thompson',
            position: 'UI Designer',
            location: 'Atlanta',
            email: 'amanda.thompson@example.com'
        },
        {
            id: 9,
            name: 'Daniel White',
            position: 'Backend Developer',
            location: 'Denver',
            email: 'daniel.white@example.com'
        },
        {
            id: 10,
            name: 'Jessica Garcia',
            position: 'HR Manager',
            location: 'Miami',
            email: 'jessica.garcia@example.com'
        },
        {
            id: 11,
            name: 'Ryan Lee',
            position: 'Full Stack Developer',
            location: 'Dallas',
            email: 'ryan.lee@example.com'
        },
        {
            id: 12,
            name: 'Kimberly Hall',
            position: 'Content Writer',
            location: 'Philadelphia',
            email: 'kimberly.hall@example.com'
        },
        {
            id: 13,
            name: 'Kevin Clark',
            position: 'Business Analyst',
            location: 'Phoenix',
            email: 'kevin.clark@example.com'
        },
        {
            id: 14,
            name: 'Melissa Lewis',
            position: 'Sales Representative',
            location: 'Portland',
            email: 'melissa.lewis@example.com'
        }
    ]);

    return (
        <div className="bg-white rounded-md p-6 shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of Candidate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Position</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location of Candidate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email of Candidate</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map(candidate => (
                        <tr key={candidate.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap">{candidate.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{candidate.position}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{candidate.location}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{candidate.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateList;
