import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { PiUserCircleFill } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/api/login", { username, password, rememberMe },
      { withCredentials: true, headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      } });

      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', background: 'linear-gradient(to bottom, #182B3A, #20A4F3)' }}>
      <div className="card mx-auto mt-4">
        <div className="card-title-container">
          <h5 className="card-title text-center my-3">SIGN IN</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin} className='d-flex flex-column mt-5 mx-5' style={{color: "#87CEEB", fontWeight: "500"}}>
            <PiUserCircleFill size={150} className='mx-auto mt-3 mb-2' style={{zIndex: 2}} />
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text" style={{backgroundColor: "#AFCCE1"}}><AiOutlineUser /></span>
                <input 
                type="text" 
                className="form-control" 
                id="username" 
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{ backgroundColor: '#AFCCE1', color: '#13274F', fontWeight: "500" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text" style={{backgroundColor: "#AFCCE1"}}><AiOutlineLock /></span>
                <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#AFCCE1', color: '#13274F', fontWeight: "500" }}
                />
              </div>
            </div>
            <div className="mb-3 d-flex justify-space-between form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              <a href="/register" className="ms-auto" style={{textDecoration: "none", color: "#87CEEB"}}>Forgot Password?</a>
            </div>
            <button type="submit" className="btn my-2" style={{backgroundColor: "#00FFFF", color: "#367588", fontWeight: "700"}}>
              LOGIN
            </button>
            <a className='mx-auto' style={{textDecoration: "none", color: "#87CEEB"}} href="/register">Not a user? Register now!</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;