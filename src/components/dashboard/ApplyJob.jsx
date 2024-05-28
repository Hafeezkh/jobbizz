import React, { useState } from 'react';
import { storage } from '../../firebase/firebaseConfig';

const ApplyJob = ({ jobData }) => {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setResume(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (resume) {
            try {
                setLoading(true);
                // Upload resume to Firebase Storage
                const storageRef = storage.ref();
                const resumeRef = storageRef.child(`resumes/${resume.name}`);
                await resumeRef.put(resume);

                // Get the download URL for the resume
                const downloadURL = await resumeRef.getDownloadURL();

                // Here, you can send application data and resume URL to your backend
                console.log('Application Data:', jobData);
                console.log('Resume URL:', downloadURL);

                // Once data is sent, you can redirect the user or show a success message
                alert('Application submitted successfully!');
            } catch (error) {
                console.error('Error submitting application:', error);
                alert('Error submitting application. Please try again later.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please upload your resume.');
        }
    };

    return (
        <div className="apply-job-container">
            <div className="job-details">
                <h2>{jobData.position}</h2>
                <p>{jobData.companyName}</p>
                {/* Display other job details */}
            </div>
            <div className="resume-upload">
                <h3>Upload Resume</h3>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button onClick={handleSubmit} disabled={!resume || loading}>
                {loading ? 'Submitting...' : 'Apply'}
            </button>
        </div>
    );
};

export default ApplyJob;
