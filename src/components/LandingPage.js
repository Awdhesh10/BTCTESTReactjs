import React, { useState,useEffect }from 'react';
import './LandingPage.css';

function LandingPage() 
{ 
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
  const totalTime = 45 * 60; // 45 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const strokeDashoffset = 113 - (113 * timeLeft) / totalTime;
  return (
       <div className="container-fluid messaging-wrapper">     
         <div className="d-flex justify-content-between align-items-center p-3 bg-light">
      {/* Left Side: Logo */}
      <div className="fw-bold text-danger"><img src="/image/Test-Logo.png" alt="Login Visual" className="img-fluid img-fluids "  /></div>
      <h1 className="fw-bold text-danger">Test Solutions  Ltd.Pvt.</h1>
      {/* Right Side: Font Size + Timer */}
      <div className="d-flex align-items-center gap-3">       
       <div className="d-flex align-items-center gap-2">
      <label className="form-label mb-0">Font Size:</label>
      <button className="btn btn-danger btn-sm" onClick={decreaseSize}>A−</button>
      <span className="fw-bold text-primary"></span>
      <button className="btn btn-success btn-sm" onClick={increaseSize}>A+</button>
    </div>
        {/* ⏱ Timer */}
         <div id="countdown">
        <div id="countdown-number">{formatTime(timeLeft)}</div>
        <svg>
          <circle r="20" cx="24" cy="24" style={{ strokeDashoffset }}></circle>
        </svg>
      </div>
      </div>
    </div>  
      <div className="text-block mt-2 justify-content-start" 
      style={{ fontSize:`${fontSize}px`,textAlign:'left',height:'200px',paddingRight:'10px',overflowY: 'auto' }}>
        <p>
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.       
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.       
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label mb-0 ms-auto">Font Size: </label>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-danger" onClick={decreaseSizeArea}>A−</button>
          <span className="fw-bold text-primary"></span>
          <button className="btn btn-success btn-sm" onClick={increaseSizeArea}>A+</button>
        </div>
      </div>

      <textarea
        className="form-control"
        rows="10"
        placeholder="Type here..."
        style={{ fontSize: `${fontSizeArea}px`, textAlign: 'left',height:'200px',paddingRight:'10px',overflowY: 'auto'  }}
      ></textarea>
    </div>
  );
}
export default LandingPage;