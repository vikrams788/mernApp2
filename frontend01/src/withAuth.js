import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token || !refreshToken) {
        navigate('/login');
        console.log("You are not authorised. Login now!");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
