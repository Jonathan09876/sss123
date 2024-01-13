import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
  }

  // const navigateToUrl = (url) => {
  //   navigate(url)
  // }

    return (
      <header>
        <Navbar bg='success' expand='sm' collapseOnSelect>
          <Container>
            <LinkContainer to='/map'>
              <Navbar.Brand>Map</Navbar.Brand>
            </LinkContainer>
            <LinkContainer to='/profile'>
              <Navbar.Brand>Profile</Navbar.Brand>
            </LinkContainer>
            { userInfo ? ( userInfo.isAdmin ? (
              <React.Fragment> 
                  <LinkContainer to='/comapnanies'>
                    <Navbar.Brand>Comapanies</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to='/file_list'>
                    <Navbar.Brand>Fiie List</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to='/users'>
                    <Navbar.Brand>Users</Navbar.Brand>
                  </LinkContainer>
              </React.Fragment>) : ("") ) : ("") }
             
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mx-auto'>
                    {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username' className="h4 text-white font-weight-bold">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
  
}

export default Header
