import React from 'react';
import './UserTypingDetails.css';
import { useNavigate } from 'react-router-dom';
function UserTypingDetails() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('first_name') || 'User';
  const lastName = localStorage.getItem('last_name') || '';
  const companyname = localStorage.getItem('companyname') || '';
  const fullName = `${firstName} ${lastName}`.trim(); 
  const RollNo = localStorage.getItem('id') || ''; 
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
        <div className="user-info d-flex align-items-center text-start">
            <img src="/image/profile.jpg" alt="User Icon" className="user-icon me-3"/>            
            <div>
              <p className="mb-0">Name: <strong>{fullName}</strong></p>
              <p className="mb-0">Roll No: <strong>{RollNo}</strong></p>
            </div>
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
      User Typeing Details
    </div>
    <div className="card-body">
        comming soon..
    </div>  
  </div>
</div>

  );
}

export default UserTypingDetails;