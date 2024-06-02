import { useContext, useEffect } from 'react'
import './index.css'
import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { Store } from './storeData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)
  // const { state, dispatch } = useContext(Store)
  // const { userInfo, mode, cart } = state

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchButton = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }
  const signoutHandler = () => {
    dispatch({ type: 'User_Signout' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }
  const automaticLogout = () => {
    let timer: NodeJS.Timeout | null = null
    const userIsActive = () => {
      if (typeof window !== 'undefined' && localStorage) {
        const isLoggedInFromStorage = localStorage.getItem('userInfo') !== null
        if (isLoggedInFromStorage) {
          clearTimeout(timer!)
          timer = setTimeout(() => {
            dispatch({ type: 'User_Signout' })
            localStorage.removeItem('userInfo')
            localStorage.removeItem('cartItems')
            localStorage.removeItem('shippingAddress')
            localStorage.removeItem('paymentMethod')
            toast.warn('Due to inactivity, your account has been logged out.')
            setTimeout(() => {
              window.location.href = '/signin'
            }, 5000)
          }, 5 * 60 * 1000) //5 * 60 * 1000
        }
      }
    }
    document.addEventListener('mousemove', userIsActive)
    document.addEventListener('keypress', userIsActive)
    document.addEventListener('scroll', userIsActive)
  }
  useEffect(() => {
    const timer = automaticLogout()

    return () => {
      clearTimeout(timer!)
    }
  })

  return (
    <div className="d-flex flex-column h-200">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className="Nav-Bar"
          variant="dark"
          expand="lg"
          style={{
            backgroundColor: mode === 'light' ? '#bbe4e9' : '#596e79',
          }}
        >
          <Container>
            <Navbar.Brand>
              <a href={'/'}>
                <img
                  src={mode === 'light' ? '../raj.png' : '../rajdarkmode.png'}
                  alt="RAJ LOGO"
                  className="Logo"
                />
              </a>
            </Navbar.Brand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchButton}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Link to="/cart" className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="black"
                className="bi bi-bag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
              <Badge className="Cart-Count">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="black"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved.</div>
      </footer>
    </div>
  )
}

export default App
