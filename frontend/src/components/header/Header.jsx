import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assests/logoo.png';
import { useAuthContext } from '../../hooks/useAuthContext'
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

import './header.css';

const Header = ({handleSport}) => {

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
              <Nav.Item className='navLink'><Link to='/' className='theLink'>Home</Link></Nav.Item>
              <Nav.Item className='navLink'><Link to='/popular' className='theLink'>popular</Link></Nav.Item>
              <Nav.Item className='navLink'><HashLink to='/#gene' className='theLink'>Highlight</HashLink></Nav.Item>
            </Nav>

            {
              user?<Nav>
                  <Nav.Item className='navLink'><Link to={`/profile/1`} className='theLink'>{user.userData.firstName}</Link></Nav.Item>
                  <Nav.Item className='navLink' onClick={handleClick}>Logout</Nav.Item>
              </Nav>:
              <Nav>
                  <Nav.Item className='navLink'><Link to='/login' className='theLink'>Login</Link></Nav.Item>
                  <Nav.Item className='navLink'><Link to='/signup' className='theLink'>Signup</Link></Nav.Item>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  )
}

export default Header;
