import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { CustomerService } from '@/services';

interface CustomerDetailsProps {
  setCustomerData: (data: any) => void;
  customerData: any;
  onNextClick: () => void;
}

const BottomMeasurements: React.FC<CustomerDetailsProps> = ({ customerData, onNextClick, setCustomerData }) => {
    const schema = Yup.object().shape({
    bottomType: Yup.string().required('Top type is required'),
    quantity: Yup.number().required('bust is required').positive('Must be a positive number'),
    waist: Yup.number().required('Waist is required').positive('Must be a positive number'),
    hip: Yup.number().required('Hip is required').positive('Must be a positive number'),
    length: Yup.number().required('Top length is required').positive('Must be a positive number'),
    thighCircumference: Yup.number().required('Thigh circumference is required').positive('Must be a positive number'),
    kneeCircumference: Yup.number().required('Knee circumference is required').positive('Must be a positive number'),
    calfCircumference: Yup.number().required('Calf circumference is required').positive('Must be a positive number'),
    ankleCircumference: Yup.number().required('Ankle circumference is required').positive('Must be a positive number'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    CustomerService
      .getCustomerData({...customerData,  bottom_measurements: data})
      .then((res) => {
        console.log(res);
        if (res.status_code === 201){
          onNextClick();
          setCustomerData((previousCustomerData: any) => ({
            ...previousCustomerData,
            bottom_measurements: data
          }));
        }
      })
      .catch((err) => {
        console.error(err);
    });
  };  

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6} lg={4} className="p-4 bg-white rounded shadow">
          <h2 className="text-center mb-4">Bottom Measurements</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formType">
              <Form.Select
                {...register('bottomType')}
                isInvalid={!!errors.bottomType}
                className="mb-3"
              >
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
                <option>Type 4</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.bottomType?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formQuanity">
              <Form.Control
                type="number"
                placeholder="Quantity"
                {...register('quantity')}
                isInvalid={!!errors.quantity}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formThighCircumference">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Thigh Circumference"
                {...register('thighCircumference')}
                isInvalid={!!errors.thighCircumference}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.thighCircumference?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formWaist">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Waist"
                {...register('waist')}
                isInvalid={!!errors.waist}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.waist?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formHip">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Hip"
                {...register('hip')}
                isInvalid={!!errors.hip}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.hip?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTopLength">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Top Length"
                {...register('length')}
                isInvalid={!!errors.length}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.length?.message}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId="formKneeCircumference">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Knee Circumference"
                {...register('kneeCircumference')}
                isInvalid={!!errors.kneeCircumference}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.kneeCircumference?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCalfCircumference">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Calf Circumference"
                {...register('calfCircumference')}
                isInvalid={!!errors.calfCircumference}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.calfCircumference?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAnkleCircumference">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Ankle Circumference"
                {...register('ankleCircumference')}
                isInvalid={!!errors.ankleCircumference}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.ankleCircumference?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Save Bottom Measurements
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BottomMeasurements;
