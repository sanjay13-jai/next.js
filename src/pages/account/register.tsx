import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { dataService } from '@/services/customer.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userService } from '@/services/user.service';

const Register = () => {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(3, 'Minimum 3 characters')
      .max(45, 'Maximum 45 characters'),
    emailID: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .max(45, 'Maximum 45 characters')
      .test(
        'is-valid',
        'Invalid email address',
        value => (value ? isEmail(value) : new Yup.ValidationError('Invalid value'))
      ),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "8 characters, including a special character"
      )
      .min(8, 'Minimum 8 characters')
      .max(45, 'Maximum 45 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    userService
      .register(data)
      .then((res: any) => {
        console.log(res)
        if (res.status_code === "201") {
          alert(res.message)
        } else {
          alert(res.status_message)
        }
      })
      .catch((err) => console.log(err))
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 ">
      <Row className="justify-content-md-center w-100 ">
        <Col md={6} lg={4} className="p-4 bg-white rounded shadow">
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formFirstName">
              <Form.Control
                type="text"
                placeholder="Your Name"
                {...register('firstName')}
                isInvalid={!!errors.firstName}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid"
               className="invalid-feedback d-block"
              >
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Your Email"
                {...register('emailID')}
                isInvalid={!!errors.emailID}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.emailID?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password')}
                isInvalid={!!errors.password}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Repeat your password"
                {...register('confirmPassword')}
                isInvalid={!!errors.confirmPassword}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>
            <div className="text-center">
              Already have an account? <a href='login/'>Sign In</a>
             </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
