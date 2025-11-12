import React, { createContext, useContext, useState, useEffect } from "react";
import { readLocal, writeLocal } from "./localStorageHelpers";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [users, setUsers] = useState(
    readLocal("users") || [
      { id: "u1", name: "Alice Khan", email: "alice@example.com" },
    ]
  );

  useEffect(() => writeLocal("users", users), [users]);

  const createUser = (data) => {
    const newUser = { id: Date.now().toString(), ...data, bookings: [] };
    setUsers((prev) => [newUser, ...prev]);
    return newUser;
  };
  const updateUser = (id, patch) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  };
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };
  const addBookingToUser = (userId, ticketId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              bookings: Array.from(new Set([...(u.bookings || []), ticketId])),
            }
          : u
      )
    );
  };
  const removeBookingFromUser = (userId, ticketId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, bookings: (u.bookings || []).filter((t) => t !== ticketId) }
          : u
      )
    );
  };

  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        updateUser,
        deleteUser,
        addBookingToUser,
        removeBookingFromUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
