// src/pages/Users.jsx
import React, { useState } from "react";
import { useUsers } from "../context/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import ModalConfirm from "../components/ModalConfirm";
import { Modal, Form } from "react-bootstrap";

export default function Users() {
  const { users, createUser, updateUser, deleteUser } = useUsers();

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const openAdd = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", phone: "" });
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, phone: user.phone || "" });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name and Email are required");
    if (editingUser) updateUser(editingUser.id, form);
    else createUser(form);
    setShowModal(false);
  };

  const confirmDelete = (user) => {
    setToDelete(user);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    deleteUser(toDelete.id);
    setShowConfirm(false);
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h3 className="mb-3">Users</h3>
        <Button variant="primary" onClick={openAdd}>
          Add User
        </Button>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || "-"}</td>
                  <td>{(u.bookings || []).length}</td>
                  <td className="d-flex flex-wrap gap-1">
                    <Button variant="info" onClick={() => openEdit(u)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(u)}>
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
            <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <FormInput
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <FormInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <FormInput
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Button type="submit" variant="success">
                {editingUser ? "Save" : "Add"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation */}
        <ModalConfirm
          show={showConfirm}
          title="Delete User"
          message={`Are you sure you want to delete ${toDelete?.name}?`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      </div>
      <Footer />
    </>
  );
}
