import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface CustomerDetailsProps {
  setCustomerData: (data: any) => void;
  onNextClick: () => void;
}

 
const CustomerDetails: React.FC<CustomerDetailsProps> = ({ setCustomerData, onNextClick }) => {
  const schema = Yup.object().shape({
    customerName: Yup.string().required('Name is required').max(100, 'Maximum 100 characters'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    altPhoneNumber: Yup.string().required('Phone number is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setCustomerData((previousCustomerData: any) => ({
      ...previousCustomerData,
      ...data
    }));
    onNextClick();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6} lg={4} className="p-4 bg-white rounded shadow">
          <h2 className="text-center mb-4">Customer Details</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Customer Name"
                {...register('customerName')}
                isInvalid={!!errors.customerName}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.customerName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                {...register('phoneNumber')}
                isInvalid={!!errors.phoneNumber}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Control
                type="text"
                placeholder="Address"
                {...register('address')}
                isInvalid={!!errors.address}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAlternativePhoneNumber">
              <Form.Control
                type="text"
                placeholder="Alternative Phone Number"
                {...register('altPhoneNumber')}
                isInvalid={!!errors.altPhoneNumber}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.altPhoneNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Save Customer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDetails;
