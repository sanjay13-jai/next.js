import React from 'react';
import { Container, Row, Col, ListGroup, Card, Table } from 'react-bootstrap';

interface Measurements {
  shoulderToBust: number;
  neckWidth: number;
  neckDepth: number;
  topLength: number;
  sleeveCircumference: number;
  sleeveLength: number;
  armhole: number;
  hip: number;
  waist: number;
  bust: number;
  shoulderWidth: number;
  topType: string;
  quantity: number;
}

interface BottomMeasurements {
  ankleCircumference: number;
  calfCircumference: number;
  kneeCircumference: number;
  thighCircumference: number;
  length: number;
  hip: number;
  waist: number;
  bottomType: string;
  quantity: number;
}

interface CustomerData {
  customerName: string;
  phoneNumber: string;
  address: string;
  altPhoneNumber: string;
  top_measurements?: Measurements;
  bottom_measurements?: BottomMeasurements;
}

interface CustomerDetailsProps {
  customerData: CustomerData;
}

const ReviewCustomer: React.FC<CustomerDetailsProps> = ({ customerData }) => {
  const { customerName, phoneNumber, address, altPhoneNumber, top_measurements, bottom_measurements } = customerData;

  return (
    <Container>
      {/* Customer Details */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header as="h2">Customer Details</Card.Header>
            <Card.Body>
              <Table bordered>
                <tbody>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{customerName}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone Number:</strong></td>
                    <td>{phoneNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>{address}</td>
                  </tr>
                  <tr>
                    <td><strong>Alternate Phone Number:</strong></td>
                    <td>{altPhoneNumber}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Measurements */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header as="h2">Top Measurements</Card.Header>
            <Card.Body>
              {top_measurements ? (
                <ListGroup>
                  {Object.entries(top_measurements).map(([key, value]) => (
                    <ListGroup.Item key={key}>
                      <strong>{formatMeasurementKey(key)}:</strong> {value}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No top measurements available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom Measurements */}
      <Row>
        <Col>
          <Card>
            <Card.Header as="h2">Bottom Measurements</Card.Header>
            <Card.Body>
              {bottom_measurements ? (
                <ListGroup>
                  {Object.entries(bottom_measurements).map(([key, value]) => (
                    <ListGroup.Item key={key}>
                      <strong>{formatMeasurementKey(key)}:</strong> {value}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No bottom measurements available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Helper function to format measurement keys
const formatMeasurementKey = (key: string) => {
  const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
  return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
};

export default ReviewCustomer;
