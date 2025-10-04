import React, { useState, useEffect } from 'react';
import './UserTypingDetails.css';
import { useNavigate } from 'react-router-dom';
import {Global} from './authService';
function UserTypingDetails() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('first_name') || 'User';
  const lastName = localStorage.getItem('last_name') || '';
  const companyname = localStorage.getItem('companyname') || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const RollNo = String(localStorage.getItem('id') || '');
  const org_id=String(localStorage.getItem('org_id') || '48'); 
  const [typingDetails, setTypingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
   const GetDataTyping = async () => {
    debugger;
    setLoading(true);
    const param = {
      rollcode: RollNo,
      org_id: org_id
    };
    const data = {
      spName: "usp_get_Typeing_Details",
      payload: JSON.stringify(param)
    };
    try {
      const response = await Global.post('/Global/GetDataFromServer', data);     
      const tableData = response.data.data.dataset.table;
      if (response.data.status === 1 && Array.isArray(tableData)) 
      {
        setTypingDetails(tableData);
      } else {
        alert("❌ Server returned no usable data.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("❌ Request failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDataTyping();
  }, []);

  // Print handler
  const handlePrint = () => {
    window.print();
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
        <div className="card-header text-start fw-bold d-flex justify-content-between align-items-center">
          <span>User Typeing Details</span>
          <button className="btn btn-primary btn-sm" onClick={handlePrint}>
            Print
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : typingDetails.length > 0 ? (
            <>
              {typingDetails.map((item, index) => (
                <div key={index} className='text-start mb-3'>
                  <p style={{fontSize:18}}>{item.description}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No typing details found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserTypingDetails;