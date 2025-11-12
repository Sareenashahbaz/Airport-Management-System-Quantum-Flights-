// src/pages/Tickets.jsx
import React, { useState } from "react";
import { useTickets } from "../context/TicketContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import ModalConfirm from "../components/ModalConfirm";
import { Modal, Form } from "react-bootstrap";

export default function Tickets() {
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();

  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [form, setForm] = useState({
    flightNo: "",
    from: "",
    to: "",
    time: "",
    gate: "",
    status: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const openAdd = () => {
    setEditingTicket(null);
    setForm({ flightNo: "", from: "", to: "", time: "", gate: "", status: "" });
    setShowModal(true);
  };

  const openEdit = (ticket) => {
    setEditingTicket(ticket);
    setForm({ ...ticket });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.flightNo ||
      !form.from ||
      !form.to ||
      !form.time ||
      !form.gate ||
      !form.status
    )
      return alert("All fields are required");
    if (editingTicket) updateTicket(editingTicket.id, form);
    else createTicket(form);
    setShowModal(false);
  };

  const confirmDelete = (ticket) => {
    setToDelete(ticket);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    deleteTicket(toDelete.id);
    setShowConfirm(false);
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h3 className="mb-3">Tickets / Flights</h3>
        <Button variant="primary" onClick={openAdd}>
          Add Ticket
        </Button>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Flight</th>
                <th>From</th>
                <th>To</th>
                <th>Time</th>
                <th>Gate</th>
                <th>Status</th>
                <th>Booked By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.flightNo}</td>
                  <td>{t.from}</td>
                  <td>{t.to}</td>
                  <td>{t.time}</td>
                  <td>{t.gate}</td>
                  <td>{t.status}</td>
                  <td>{(t.bookedBy || []).length}</td>
                  <td className="d-flex flex-wrap gap-1">
                    <Button variant="info" onClick={() => openEdit(t)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(t)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingTicket ? "Edit Ticket" : "Add Ticket"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {["flightNo", "from", "to", "time", "gate", "status"].map((f) => (
                <FormInput
                  key={f}
                  label={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  required
                />
              ))}
              <Button type="submit" variant="success">
                {editingTicket ? "Save" : "Add"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation */}
        <ModalConfirm
          show={showConfirm}
          title="Delete Ticket"
          message={`Are you sure you want to delete flight ${toDelete?.flightNo}?`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      </div>
      <Footer />
    </>
  );
}
