import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../storeData'
import { ApiError } from '../types/ApiError'
import { toast } from 'react-toastify'
import { getError } from '../utilities'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import '../index.css'
import LoadingBox from '../components/LoadingBox'
import { useSigninMutation } from '../hooks/userHook'

export default function SigninPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isPending } = useSigninMutation()
  const submitLoginHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await signin({
        email,
        password,
      })
      dispatch({ type: 'User_Signin', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitLoginHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="custom-border"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="custom-border"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isPending} type="submit">
            Sign In
          </Button>
          {isPending && <LoadingBox />}
        </div>

        <div className="mb-3">
          <Link to={`/signup?redirect=${redirect}`}>
            Don't have an account yet?
          </Link>
        </div>
      </Form>
    </Container>
  )
}
