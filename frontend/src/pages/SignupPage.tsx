import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../storeData'
import { useSignupMutation } from '../hooks/userHook'
import { getError } from '../utilities'
import { ApiError } from '../types/ApiError'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function SignupPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, navigate, userInfo])

  const { mutateAsync: signup } = useSignupMutation()

  const submitRegisterHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password do not match.')
      return
    }
    try {
      const data = await signup({
        name,
        email,
        password,
      })
      dispatch({ type: 'User_Signin', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      // navigate(redirect || '/')
      window.location.reload()
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }
  return (
    <div className="signup-page-container">
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3"> Sign Up</h1>
        <Form onSubmit={submitRegisterHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              required
              className="signup-border"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="signup-border"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="signup-border"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="signup-border"
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Register</Button>
          </div>
          <div className="mb-3">
            Already have an Account?{' '}
            <Link to={`/signin?redirect=${redirect}`}> Sign-In</Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}
