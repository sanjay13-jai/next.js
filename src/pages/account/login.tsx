import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { userService } from '@/services/user.service';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const schema = Yup.object().shape({
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
        'Must contain 8 characters, one uppercase, one lowercase, one number, and one special character'
      )
      .min(8, 'Minimum 8 characters')
      .max(45, 'Maximum 45 characters'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    emailID,
    password,
  }: {
    emailID: string;
    password: string;
  }) => {
    return userService
      .login(emailID, password)
      .then((res) => {
        if (res.isCorrectPW
          //  && !res.isLoggedIn
          ) {
          login(res);
          const returnUrl = (router.query.returnUrl || "/") as string;
          router.push(returnUrl);
        }
        else{
          alert(res.message)
        }
      })
      .catch((err) =>
        console.log(err, "err")
      );
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center w-100 ">
        <Col md={6} lg={4} className="p-4 bg-white rounded shadow">
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
          < Form.Group controlId="formEmail">
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

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign In
            </Button>
            <div className="text-center">  
              Don't have an account? <a href='register/'>Sign Up</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
