// src/pages/Bookings.jsx
import React, { useState } from "react";
import { useUsers } from "../context/UserContext";
import { useTickets } from "../context/TicketContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Form, Card } from "react-bootstrap";

export default function Bookings() {
  const { users, addBookingToUser, removeBookingFromUser } = useUsers();
  const { tickets, bookTicket, unbookTicket } = useTickets();

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("");

  const handleBook = () => {
    if (!selectedUser || !selectedTicket)
      return alert("Select both user and ticket");
    bookTicket(selectedTicket, selectedUser);
    addBookingToUser(selectedUser, selectedTicket);
  };

  const handleUnbook = (ticketId) => {
    removeBookingFromUser(selectedUser, ticketId);
    unbookTicket(ticketId, selectedUser);
  };

  const userObj = users.find((u) => u.id === selectedUser);
  const bookedTickets =
    userObj?.bookings?.map((bid) => tickets.find((t) => t.id === bid)) || [];

  return (
    <>
      <Header />
      <div className="container py-4">
        <h3 className="mb-3">Bookings</h3>

        <Form className="d-flex flex-wrap gap-2 mb-3">
          <Form.Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-100 w-sm-auto"
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            value={selectedTicket}
            onChange={(e) => setSelectedTicket(e.target.value)}
            className="w-100 w-sm-auto"
          >
            <option value="">Select Ticket</option>
            {tickets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.flightNo} ({t.from} {"->"} {t.to})
              </option>
            ))}
          </Form.Select>

          <Button onClick={handleBook}>Book</Button>
        </Form>

        {selectedUser && (
          <div>
            <h5>{userObj.name}'s Booked Flights</h5>
            {bookedTickets.length ? (
              bookedTickets.map((t) => (
                <Card
                  key={t.id}
                  className="mb-2 p-2 d-flex flex-row justify-content-between align-items-center"
                >
                  <div>
                    {t.flightNo} ({t.from} {"->"} {t.to})
                  </div>
                  <Button variant="danger" onClick={() => handleUnbook(t.id)}>
                    Unbook
                  </Button>
                </Card>
              ))
            ) : (
              <p>No bookings yet</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
