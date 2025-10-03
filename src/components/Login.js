import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {API} from './authService';

function Login() 
{
  const [formData, setFormData] = useState({
    Mobile_No: '',    
    password:  '',   
    org_id:String(localStorage.getItem('org_id') || '48'),     
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });   
    setErrorMsg(''); // clear error on input change
  };
 const handleLogin = async (e) => {
  debugger;
  e.preventDefault();
  setLoading(true);
  setErrorMsg('');
  const data = new URLSearchParams();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  try {
    const response = await API.post('/oauth/studenttoken', data);
    const resData = response.data;
    console.log('Login response:', resData);
    // ✅ Check for status and token
    if (resData.status === 1 && resData.idToken?.access_token) {
      localStorage.setItem('token', resData.idToken.access_token);
       const { first_name, last_name, companyname,id} = resData.student;     
       localStorage.setItem('first_name', first_name || '');
       localStorage.setItem('last_name', last_name || '');
       localStorage.setItem('companyname', companyname || '');
       localStorage.setItem('id', id || '');
       navigate('/Instruction');
    } else {
      setErrorMsg('Invalid userid or password.');
    }
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed. Please try again.';
    setErrorMsg(message);
  }
  finally {
      setLoading(false);
  }
};
  return (
      <div className="container-fluid login-wrapper">
      <div className="row vh-100">
        {/* Left Side - Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <div className="image-container">
            <img src="/image/loginpage.png" alt="Login Visual" className="img-fluid full-height" />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-dark">
          <div className="login-card animate__animated animate__fadeInRight">
            <h3 className="text-center mb-4 text-light">Welcome to Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatinguser"  name="Mobile_No"
                  value={formData.Mobile_No}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Enter User Id" />
                <label htmlFor="floatinguser">Enter User Id</label>
               
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password" autoComplete="off"/>
                <label htmlFor="floatingPassword">Password</label>
                 <span className="text-danger">UserID:-STU45033 <br></br>Password:-123456</span>                
              </div>
              {errorMsg && <div className="text-danger mb-3 text-center">{errorMsg}</div>}
                <button
                      type="submit"
                      className="btn btn-warning w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>
                          <span
                            className="spinner-border spinner-border-sm me-2 text-white" 
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Logging in...
                        </span>
                      ) : (
                        'Login'
                      )}
              </button>
              {/* <button type="submit" className="btn btn-warning w-100">Login</button> */}
            </form>
            {/* <p className="text-center mt-3 text-light">
              Don't have an account? <a href="#" className="text-decoration-none text-warning">Sign up</a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
