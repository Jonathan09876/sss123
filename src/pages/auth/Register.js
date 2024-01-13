import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { registerAction } from '../../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success, userInfo } = userRegister

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) {
      navigate('/project')
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      
    }
  }

  const onSubmit = async (values) => {
    dispatch(registerAction(values.name, values.email, values.password))
  };

  return (
    <FormContainer>
      <h2 className="text-center">Sign Up</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="my-3">
          <Col md={6}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                {...register("name", {
                  required: "Name is required",
                })}
              ></Form.Control>
              {errors.name && <Message variant='danger'>{errors.name.message}</Message>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
              ></Form.Control>
              {errors.email && <Message variant='danger'>{errors.email.message}</Message>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="my-3">
          <Col md={6}>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password is too short"
                  }
                })}
              ></Form.Control>
              {errors.password && <Message variant='danger'>{errors.password.message}</Message>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Password is too short"
                  },
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              ></Form.Control>
              {errors.confirmPassword && <Message variant='danger'>{errors.confirmPassword.message}</Message>}
            </Form.Group>
          </Col>
        </Row>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={'/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
