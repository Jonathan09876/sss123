import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/userActions'

const LoginScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/project");
    }
  }, [dispatch, success]);

  const onSubmit = async (values) => {
    dispatch(login(values.email, values.password))
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <FormContainer>
      <h2 className="text-center">Sign In</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Form.Group controlId="password" className="my-3">
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
        
        <Button type='submit' variant='primary' className="mx-auto">
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col className="justify-content-center d-flex">
          New User ? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
