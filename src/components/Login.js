import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add validation or API call here
    // Redirect to landing page
    navigate('/landing');
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
                <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                <label htmlFor="floatingEmail">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-warning w-100">Login</button>
            </form>
            <p className="text-center mt-3 text-light">
              Don't have an account? <a href="#" className="text-decoration-none text-warning">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
