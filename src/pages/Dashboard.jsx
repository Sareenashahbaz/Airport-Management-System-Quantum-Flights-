// src/pages/Dashboard.jsx
import React from "react";
import Header from "../components/Header";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useUsers } from "../context/UserContext";
import { useTickets } from "../context/TicketContext";

export default function Dashboard() {
  const { users } = useUsers();
  const { tickets } = useTickets();

  return (
    <>
      <Header />
      <Container className="py-4">
        <h3 className="mb-4">Dashboard</h3>
        <Row className="g-3">
          <Col md={6} lg={3}>
            <Card className="shadow-sm text-center p-3">
              <h5>Total Users</h5>
              <h3>Total Users: {users ? users.length : 0}</h3>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm text-center p-3">
              <h5>Total Flights</h5>
              <h3>Total Tickets: {tickets ? tickets.length : 0}</h3>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm text-center p-3">
              <h5>Total Bookings</h5>
              <h2>
                {tickets.reduce((acc, t) => acc + (t.bookedBy?.length || 0), 0)}
              </h2>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm text-center p-3">
              <h5>Active Users</h5>
              <h2>{users.filter((u) => u.bookings?.length > 0).length}</h2>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
