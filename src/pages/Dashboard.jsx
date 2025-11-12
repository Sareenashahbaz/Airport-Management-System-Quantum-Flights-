// src/pages/Dashboard.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUsers } from "../context/UserContext";
import { useTickets } from "../context/TicketContext";
// if you imported hero via src/assets:
import heroImage from "../assets/airport-hero.jpg";

export default function Dashboard() {
  const { users } = useUsers();
  const { tickets } = useTickets();

  return (
    <>
      <Header />

      {/* HERO — background image, overlay and centered text */}
      <section
        className="dashboard-hero"
        aria-label="Dashboard hero"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="dashboard-hero__overlay" />
        <div className="dashboard-hero__content">
          <h1 className="dashboard-hero__title">
            Welcome to Airport Management System of Quantum Flights
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="main-content">
        <div className="container py-4">
          <h2 className="mb-4">Dashboard Overview</h2>

          <div className="row g-3">
            <div className="col-sm-6 col-md-4">
              <div className="card text-center p-3 shadow-sm">
                <h6 className="mb-2">Total Users</h6>
                <h3>{users?.length ?? 0}</h3>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="card text-center p-3 shadow-sm">
                <h6 className="mb-2">Total Tickets</h6>
                <h3>{tickets?.length ?? 0}</h3>
              </div>
            </div>

            <div className="col-sm-12 col-md-4">
              <div className="card text-center p-3 shadow-sm">
                <h6 className="mb-2">Total Bookings</h6>
                <h3>
                  {tickets
                    ? tickets.reduce(
                        (acc, t) => acc + (t.bookedBy?.length || 0),
                        0
                      )
                    : 0}
                </h3>
              </div>
            </div>
          </div>

          {/* rest of your dashboard content here */}
        </div>
      </main>

      <Footer />
    </>
  );
}
