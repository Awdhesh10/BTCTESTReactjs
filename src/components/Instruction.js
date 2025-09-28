import React from 'react';
import './Instruction.css';
import { useNavigate } from 'react-router-dom';
function Instruction() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('first_name') || 'User';
  const lastName = localStorage.getItem('last_name') || '';
  const companyname = localStorage.getItem('companyname') || '';
  const fullName = `${firstName} ${lastName}`.trim(); 
  const RollNo = localStorage.getItem('role_code') || '';
  const handleStartClick = () => {
    navigate('/landing');
  };
  return (  
  <div className="container-fluid wrapper">
  {/* Header Row */}
  <div className="row bg-info text-white align-items-center py-3">
    {/* Company Name */}
    <div className="col-12 col-md-9 text-center text-md-start mb-2 mb-md-0">
      <h1 className="fw-bold">{companyname}</h1>
    </div>

    {/* User Info */}
    <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-start align-items-center mb-2 mb-md-0">
      <img src="/image/profile.jpg" alt="User Icon" className="user-icon me-2" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      <div>
        <p className="mb-0">Name: <strong>{fullName}</strong></p>
        <p className="mb-0">Roll No: <strong>{RollNo}</strong></p>
      </div>
    </div>

    {/* Logo */}
    <div className="col-12 col-md-1 text-center text-md-end">
      <img src="/image/Test-Logo.png" alt="Logo" className="img-fluid" style={{ maxHeight: '50px' }} />
    </div>
  </div>

  {/* Instruction Card */}
  <div className="card mt-4">
    <div className="card-header text-start fw-bold">
      Instructions
    </div>
    <div className="card-body">
      <ol className="text-start">
        <li>You have 20 minutes to complete the test.</li>
        <li>The test contains a total of 10 questions.</li>
        <li>You will be awarded one mark for each correct answer.</li>
        <li>There is no negative marking.</li>
        <li>You can navigate your answer by clicking on another option.</li>
        <li>You can change your answer by clicking on the "Clear" button.</li>
        <li>You can mark a question for review later by clicking on the "Review" button.</li>
        <li>You can move back or forth between questions using "Previous" and "Save & Next" buttons.</li>
        <li>A number list of all questions appears on the right-hand side. You can access questions in any order.</li>
        <li>Do not use reference tools like textbooks, calculators, or dictionaries during the test.</li>
        <li>Do not click "End Test" before completing. Once submitted, the test cannot be resumed.</li>
      </ol>
    </div>
    <div className="card-footer text-center">
      <button className="btn btn-primary px-4" onClick={handleStartClick}>Start</button>
    </div>
  </div>
</div>

  );
}

export default Instruction;