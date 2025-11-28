import React from 'react';
import './StudentProfileCard.css';

const StudentProfileCard = () => {
  const studentInfo = {
    name: "Alex Johnson",
    id: "STU-54321",
    major: "Computer Science",
    avatar: "https://i.pravatar.cc/150?img=5"
  };

  return (
    <div className="card-container">
      <h1>Student Profile</h1>
      {/* No more conditional logic is needed here! */}
      <div className="profile-card">
        <img src={studentInfo.avatar} alt={`${studentInfo.name}'s avatar`} className="profile-avatar" />
        <div className="profile-details">
          <h2>{studentInfo.name}</h2>
          <p><strong>Student ID:</strong> {studentInfo.id}</p>
          <p><strong>Major:</strong> {studentInfo.major}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;