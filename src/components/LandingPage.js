import React, { useState,useEffect,useRef }from 'react';
import './LandingPage.css';
import {Global} from './authService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const fontOptions = [
  { label: 'Roboto', value: 'Roboto', style: { fontFamily: 'Roboto, sans-serif' } },
  { label: 'Courier New', value: 'Courier New', style: { fontFamily: 'Courier New, monospace' } },
  { label: 'Georgia', value: 'Georgia', style: { fontFamily: 'Georgia, serif' } },
  { label: 'Comic Sans', value: 'Comic Sans MS', style: { fontFamily: 'Comic Sans MS, cursive' } },
  { label: 'Arial', value: 'Arial', style: { fontFamily: 'Arial, sans-serif' } },
  { label: 'Times New Roman', value: 'Times New Roman', style: { fontFamily: 'Times New Roman, serif' } },  
];
function LandingPage() 
{ 
  const firstName = localStorage.getItem('first_name') || 'User';
  const lastName = localStorage.getItem('last_name') || '';
  const companyname = localStorage.getItem('companyname') || '';
  const fullName = `${firstName} ${lastName}`.trim(); 
  const RollNo = String(localStorage.getItem('id') || '');
  const org_id=String(localStorage.getItem('org_id') || '48'); 
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [timerStarted, setTimerStarted] = useState(false);

  // Start and End time states
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Press OK to start your typing test.',
      icon: 'info',
      confirmButtonText: 'OK'
    }).then(() => {
      setTimerStarted(true);
      setStartTime(new Date().toISOString()); // Set start time
    });
  }, []);

  const handleSavetext = async (e) => {   
    debugger; 
    if (e?.preventDefault) e.preventDefault();  
    setLoading(true);  
    const param = {
      description: text,
      rollcode: RollNo,
      fullname: fullName,
      org_id: org_id,
      created_by: org_id,
      starttime: startTime,
      endtime: endTime || new Date().toISOString() // Use endTime or current time
    };  
    const data = {
      spName: "usp_SaveUser_Typeing_Details",
      payload: JSON.stringify(param)
    };  
    try {    
      const response = await Global.post('/Global/GetDataFromServer', data);    
      console.log("Response Data:", response.data); 
      if (response.data.status === 1) {   
        if (response.status === 200) {
          //alert("✅Saved successfully.");
          navigate('/typingdetails');
        } else if (response.status === "alreadyexist") {
          alert("⚠️ Duplicate entry. Please try again.");
        } else {
          alert("❌ Unexpected response: ");
        }
      } else {
        alert("❌ Server returned no usable data.");
      }
    } catch (error) {
      console.error("Error during save:", error);
      alert("❌ Request failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);
  const [fontSize, setFontSize] = useState(18);
  const increaseSize = () => {
    setFontSize((prev) => Math.min(prev + 5, 75));
  };
  const decreaseSize = () => {
    setFontSize((prev) => Math.max(prev - 5, 10));
  };
  // Font size for textarea
  const [fontSizeArea, setFontSizeArea] = useState(18); 
  const increaseSizeArea = () => {
    setFontSizeArea((prev) => Math.min(prev + 5, 75));
  };
  const decreaseSizeArea = () => {
    setFontSizeArea((prev) => Math.max(prev - 5, 10));    
  };
  const totalTime = 2 * 60; // 2 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (!timerStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); 
          setEndTime(new Date().toISOString()); // Set end time
          handleSavetext();
          if (formRef.current) {
            formRef.current.requestSubmit(); // ✅ Simulates button click
          } 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const strokeDashoffset = 113 - (113 * timeLeft) / totalTime;
  return (
     <div className="container-fluid messaging-wrapper">     
     <div className="row d-flex justify-content-between align-items-center p-3 bg-info text-white">
  <div className="col-12 col-md-2 text-center text-md-start mb-2 mb-md-0">
    <img src="/image/Test-Logo.png" alt="Login Visual" className="img-fluid img-fluids" />
  </div>
  <div className="col-12 col-md-4 text-center mb-2 mb-md-0">
    <h1 className="fw-bold text-danger">{companyname}</h1>
  </div>
  <div className="col-12 col-md-6 d-flex flex-wrap justify-content-md-end align-items-center gap-3">
    {/* Font size buttons */}
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-danger btn-sm" onClick={decreaseSize}>A−</button>
      <button className="btn btn-success btn-sm" onClick={increaseSize}>A+</button>
    </div>

    {/* Font dropdown */}
    <select
      className="form-select w-auto"
      value={selectedFont}
      onChange={(e) => setSelectedFont(e.target.value)}
      style={{ fontFamily: selectedFont }}
    >
      {fontOptions.map((font) => (
        <option key={font.value} value={font.value} style={font.style}>
          {font.label}
        </option>
      ))}
    </select>

    {/* User Info */}
      <div className="user-info d-flex align-items-center text-start">
            <img src="/image/profile.jpg" alt="User Icon" className="user-icon me-3"/>            
            <div>
              <p className="mb-0">Name: <strong>{fullName}</strong></p>
              <p className="mb-0">Roll No: <strong>{RollNo}</strong></p>
            </div>
          </div> 

    {/* Timer */}
    <div id="countdown">
      <div id="countdown-number">{formatTime(timeLeft)}</div>
      <svg>
        <circle r="20" cx="24" cy="24" style={{ strokeDashoffset }}></circle>
      </svg>
    </div>
  </div>
     </div>
      <div className="row p-3">
            <div className="text-block mt-2 justify-content-start" 
      style={{fontSize:`${fontSize}px`,textAlign:'left',height:'300px',paddingRight:'10px',overflowY: 'auto', overflowX:'auto',fontFamily: selectedFont,fontFamily: selectedFont, userSelect: 'none',
      }}>
        <p>
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.       
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.       
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.
        </p>
      </div>
    </div>
     <div className="row p-3">
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
        <label className="form-label mb-0 ms-auto">Font Size: </label>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-danger" onClick={decreaseSizeArea}>A−</button>
          <span className="fw-bold text-primary"></span>
          <button className="btn btn-success btn-sm" onClick={increaseSizeArea}>A+</button>
        </div>
      </div> 
      <form ref={formRef} onSubmit={handleSavetext}>
  <textarea
        className="form-control"
        rows="10"
        placeholder="Type here..."  value={text}        
        onChange={(e) => setText(e.target.value)}
        style={{ fontSize: `${fontSizeArea}px`, textAlign: 'left',height:'350px',overflowX:'auto',overflowY: 'auto',fontFamily: selectedFont  }}
      ></textarea>
</form>     
      {/* Show Start and End Time for reference */}
      <div className="mt-3">
        <div>Start Time: <span className="text-success">{startTime ? new Date(startTime).toLocaleString() : '--'}</span></div>
        <div>End Time: <span className="text-danger">{endTime ? new Date(endTime).toLocaleString() : '--'}</span></div>
      </div>
      </div>  
   </div>   
  );
}
export default LandingPage;