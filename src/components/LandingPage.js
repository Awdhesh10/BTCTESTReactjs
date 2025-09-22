import React, { useState,useEffect }from 'react';
import './LandingPage.css';

function LandingPage() 
{
  const [fontSize, setFontSize] = useState('medium');
  const sizes = ['small', 'medium', 'large'];
  const fontSizeMap = {
    small: '14px',
    medium: '25px',
    large: '50px',
  };
  const currentIndex = sizes.indexOf(fontSize);
  const increaseSize = () => {
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };
  const decreaseSize = () => {
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  // Font size for textarea
  const [fontSizeArea, setFontSizeArea] = useState('medium');
  const fontSizeMapArea = {
    small: '14px',
    medium: '25px',
    large: '40px',
  };
  const increaseSizeArea = () => {
    if (fontSizeArea === 'small') setFontSizeArea('medium');
    else if (fontSizeArea === 'medium') setFontSizeArea('large');
  };
  const decreaseSizeArea = () => {
    if (fontSizeArea === 'large') setFontSizeArea('medium');
    else if (fontSizeArea === 'medium') setFontSizeArea('small');
  };
 //const [time, setTime] = useState(new Date());

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
      <button className="btn btn-outline-secondary btn-sm" onClick={decreaseSize}>−</button>
      <span className="fw-bold text-primary">{fontSize}</span>
      <button className="btn btn-outline-secondary btn-sm" onClick={increaseSize}>+</button>
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
      

      {/* Section 1 */}
      {/* <div className="d-flex justify-content-start">
      <div className="section-label mt-4">Section 1</div>
      </div> */}
      <div className="text-block mt-2 justify-content-start" style={{ fontSize: fontSizeMap[fontSize], textAlign: 'left' }}>
        <p>
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.       
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.       
          Everyone reads their texts. We help you send them. Reach large groups with SMS marketing or connect one-on-one with two-way messaging.
        </p>
      </div>

      {/* Section 2 */}
       {/* <div className="d-flex justify-content-start">
      <div className="section-label">Section 2</div>
      </div>       */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label mb-0 ms-auto">Textarea Font Size:</label>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={decreaseSizeArea}>−</button>
          <span className="fw-bold text-primary">{fontSizeArea}</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={increaseSizeArea}>+</button>
        </div>
      </div>

      <textarea
        className="form-control"
        rows="10"
        placeholder="Type here..."
        style={{ fontSize: fontSizeMapArea[fontSizeArea], textAlign: 'left' }}
      ></textarea>
    </div>
  );
}
export default LandingPage;