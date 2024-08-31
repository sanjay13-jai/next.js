import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface TopMeasurementsProps {
  setCustomerData: (data: any) => void;
  onNextClick: () => void;
}

const TopMeasurements: React.FC<TopMeasurementsProps> = ({ setCustomerData, onNextClick }) => {
  const schema = Yup.object().shape({
    topType: Yup.string().required('Top type is required'),
    quantity: Yup.number().required('bust is required').positive('Must be a positive number'),
    shoulderWidth: Yup.number().required('Shoulder width is required').positive('Must be a positive number'),
    bust: Yup.number().required('bust is required').positive('Must be a positive number'),
    waist: Yup.number().required('Waist is required').positive('Must be a positive number'),
    hip: Yup.number().required('Hip is required').positive('Must be a positive number'),
    armhole: Yup.number().required('Armhole is required').positive('Must be a positive number'),
    sleeveLength: Yup.number().required('Sleeve length is required').positive('Must be a positive number'),
    sleeveCircumference: Yup.number().required('Sleeve circumference is required').positive('Must be a positive number'),
    topLength: Yup.number().required('Top length is required').positive('Must be a positive number'),
    neckDepth: Yup.number().required('Neck depth is required').positive('Must be a positive number'),
    neckWidth: Yup.number().required('Neck width is required').positive('Must be a positive number'),
    shoulderToBust: Yup.number().required('Shoulder to bust is required').positive('Must be a positive number'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setCustomerData((previousCustomerData: any) => ({
      ...previousCustomerData,
      top_measurements: data
    }));
    onNextClick();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6} lg={4} className="p-4 bg-white rounded shadow">
          <h2 className="text-center mb-4">Top Measurements</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>

          <Form.Group controlId="formType">
              <Form.Select
                {...register('topType')}
                isInvalid={!!errors.topType}
                className="mb-3"
              >
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
                <option>Type 4</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.topType?.message}
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

            <Form.Group controlId="formShoulderWidth">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Shoulder Width"
                {...register('shoulderWidth')}
                isInvalid={!!errors.shoulderWidth}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.shoulderWidth?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formbust">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="bust"
                {...register('bust')}
                isInvalid={!!errors.bust}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.bust?.message}
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

            <Form.Group controlId="formArmhole">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Armhole"
                {...register('armhole')}
                isInvalid={!!errors.armhole}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.armhole?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSleeveLength">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Sleeve Length"
                {...register('sleeveLength')}
                isInvalid={!!errors.sleeveLength}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.sleeveLength?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSleeveCircumference">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Sleeve Circumference"
                {...register('sleeveCircumference')}
                isInvalid={!!errors.sleeveCircumference}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.sleeveCircumference?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTopLength">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Top Length"
                {...register('topLength')}
                isInvalid={!!errors.topLength}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.topLength?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formNeckDepth">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Neck Depth"
                {...register('neckDepth')}
                isInvalid={!!errors.neckDepth}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.neckDepth?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formNeckWidth">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Neck Width"
                {...register('neckWidth')}
                isInvalid={!!errors.neckWidth}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.neckWidth?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formShoulderTobust">
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Shoulder to bust"
                {...register('shoulderToBust')}
                isInvalid={!!errors.shoulderToBust}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.shoulderToBust?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Save Measurements
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TopMeasurements;
