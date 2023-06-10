import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link , NavLink } from 'react-router-dom';
import logo from '../../assests/logoo.png';
import { useAuthContext } from '../../hooks/useAuthContext'
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

import './header.css';

const Header = () => {

  const { user ,dispatch,toggleNavItems} = useAuthContext();
  const navigate = useNavigate();


  const handleClick = () => {
      localStorage.removeItem('vh_user');
      dispatch({type: 'LOGOUT'});
      toggleNavItems(false);
      navigate('/');
  }
  

  return (
    <>
      <Navbar collapseOnSelect expand="lg"  
         className='navbar-custom'>
        <Container className='d-flex justify-space-between'>
          <Navbar.Brand>
            <Link to='/'>
              <img src={logo} alt="" style={{width:'11rem' , height:'3rem'}}/>
            </Link>
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item className='navLink'><NavLink
                    to="/"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#6aac28" : "",
                      };
                    }}
                    className='navvv'
                  >
                    Home
                  </NavLink></Nav.Item>
              <Nav.Item className='navLink'><NavLink
                    to="/popular"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#6aac28" : "",
                      };
                    }}
                    className='navvv'
                  >
                    Popular
                  </NavLink></Nav.Item>
              <Nav.Item className='navLink'><HashLink to='/#gene' className='theLink'>Highlight</HashLink></Nav.Item>
            </Nav>

            {
              user?<Nav>
                  <Nav.Item className='navLink'>
                    <NavLink
                    to={`/profile/1`}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#6aac28" : "",
                      };
                    }}
                    className='navvv'
                  >
                    {user.userData.firstName}
                  </NavLink>
                    </Nav.Item>
                  <Nav.Item className='navLink' onClick={handleClick}>Logout</Nav.Item>
              </Nav>:
              <Nav>
                  <Nav.Item className='navLink'>
                  <NavLink
                    to={`/login`}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#6aac28" : "",
                      };
                    }}
                    className='navvv'
                  >
                    Login
                  </NavLink>
                    </Nav.Item>
                  <Nav.Item className='navLink'>
                  <NavLink
                    to={`/signup`}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#6aac28" : "",
                      };
                    }}
                    className='navvv'
                  >
                    Signup
                  </NavLink>
                  </Nav.Item>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  )
}

export default Header;
