# Quantum Flight Airport Management System

A web-based Airport Management System designed to manage flights, passengers, and staff efficiently. Built using modern frontend technologies with a clean and responsive interface.

---

##  Folder Structure

airport-ams/
│
├── main.jsx
├── index.html 
├── src/
│ ├── index.css
│ └── App.jsx
| ├── components/
| ├── pages/ 
| ├── context/ 
| ├── assets/ 
└── README.md 

The structure keeps your files organized for scalability and easier maintenance.

---

##  How to Run the Project?

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/Airport-Management-System-Quantum-Flights.git
```

2. **Navigate to the project folder:**

```bash
cd airport-ams
```
3. **Open the project in your browser:**

• Open index.html directly in your browser.

• Or use a local server for better results (recommended for JS features):

```bash
# Using VS Code Live Server extension
# Or Python HTTP server
python -m http.server 5500
```
---
## Context Usage Explanation

This project uses React Context API to manage global state across components.

• Purpose: Avoid passing props manually through multiple layers.

• Example Use Case:

   • Sharing flight and passenger data across different components

   • Updating the flight schedule dynamically without reloading the page
   
``` bash
// Example: Creating a context
const FlightContext = React.createContext();

// Providing context
<FlightContext.Provider value={{ flights, setFlights }}>
  <FlightDashboard />
</FlightContext.Provider>

// Consuming context
const { flights, setFlights } = useContext(FlightContext);
```
---
## Chosen Styling Framework

This project uses Bootstrap 5 for styling:

 • Prebuilt responsive grid system for layouts

 • Utility classes for spacing, typography, and colors

 • Components like buttons, cards, and modals for quick UI development

 • Tailwind could be used alternatively, but Bootstrap was chosen for faster prototyping and simplicity.
---

## Screenshots

![Dashboard](<img width="1338" height="673" alt="Dashboard" src="https://github.com/user-attachments/assets/bee67cc8-c030-4139-ae8b-92913e14161a" />)
![Flights](<img width="1301" height="575" alt="Flights" src="https://github.com/user-attachments/assets/49f910f9-0829-4127-9915-8e7d0ae7f43e" />)
![Users](<img width="1276" height="633" alt="Users" src="https://github.com/user-attachments/assets/5756dada-4b95-4403-92d5-d4f9474fff5e" />)
---
## How to Push Your Local Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/Airport-Management-System-Quantum-Flights.git
git push -u origin main
```
Replace yourusername with your GitHub username. Use main or master based on your branch.
---

##Author
**Sareena Shahbaz**
---


   
