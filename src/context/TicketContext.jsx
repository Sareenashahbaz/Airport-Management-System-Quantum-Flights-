import React, { createContext, useContext, useState, useEffect } from "react";
import { readLocal, writeLocal } from "./localStorageHelpers";

const TicketContext = createContext();
export const useTickets = () => useContext(TicketContext);

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(
    readLocal("tickets") || [
      {
        id: "t1",
        flightNo: "AK101",
        from: "LHE",
        to: "ISB",
        time: "12:30",
        gate: "A3",
        status: "On Time",
        bookedBy: [],
      },
    ]
  );

  useEffect(() => writeLocal("tickets", tickets), [tickets]);

  const createTicket = (data) => {
    const newT = { id: Date.now().toString(), ...data, bookedBy: [] };
    setTickets((prev) => [newT, ...prev]);
    return newT;
  };
  const updateTicket = (id, patch) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };
  const deleteTicket = (id) =>
    setTickets((prev) => prev.filter((t) => t.id !== id));

  const bookTicket = (ticketId, userId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              bookedBy: Array.from(new Set([...(t.bookedBy || []), userId])),
            }
          : t
      )
    );
  };
  const unbookTicket = (ticketId, userId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, bookedBy: (t.bookedBy || []).filter((u) => u !== userId) }
          : t
      )
    );
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        createTicket,
        updateTicket,
        deleteTicket,
        bookTicket,
        unbookTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
