import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import withAuth from '../withAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const usersPerPage = 5;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users`,
    { withCredentials: true, headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    } })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * usersPerPage;
  const displayedUsers = users.slice(offset, offset + usersPerPage);

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    navigate('/login');
  };

  return (
    <div className="container-fluid d-flex justify-content-center" style={{minHeight: "100vh", marginTop: "200px"}}>
      <div className="row justify-content-center">
        <div className="col text-center">
          <table className="table table-bordered table-striped table-hover text-center" style={{ borderCollapse: 'collapse' }}>
            <thead className="bg-primary text-white">
              <tr>
                <th style={{color: "#034694", border: 'none'}}>Index</th>
                <th style={{color: "#034694", minWidth: "200px", border: 'none'}}>Name</th>
                <th style={{color: "#034694", minWidth: "150px", border: 'none'}}>Date of Birth</th>
                <th style={{color: "#034694", border: 'none'}}>Email</th>
                <th style={{color: "#034694", border: 'none'}}>Password</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user, index) => (
                <tr key={user._id}>
                  <td style={{color: "#5F9EA0", fontWeight: "500", border: 'none', padding: '20px' }}>{index + 1}</td>
                  <td style={{color: "#034694", fontWeight: "700", border: 'none', padding: '20px' }}>{user.username}</td>
                  <td style={{color: "#5F9EA0", fontWeight: "500", border: 'none', padding: '20px' }}>{user.dob}</td>
                  <td style={{color: "#5F9EA0", fontWeight: "500", border: 'none', padding: '20px' }}>{user.email}</td>
                  <td style={{color: "#5F9EA0", fontWeight: "500", border: 'none', padding: '20px' }}>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center" style={{width: "100%"}}>
            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={' ... '}
              pageCount={Math.ceil(users.length / usersPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center'}
              activeClassName={'active'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
