import React from 'react';

const JobCard = ({ job, onDelete }) => {
    return (
        <div className="bg-white rounded-md p-6 mb-4">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-700">Experience: {job.experience}</p>
            <p className="text-gray-700">Salary: {job.salary}</p>
            <p className="text-gray-700">Location: {job.location}</p>
            <button className="bg-red-500 text-white py-2 px-4 rounded-md mt-2" onClick={() => onDelete(job.id)}>Delete</button>
        </div>
    );
};

export default JobCard;
