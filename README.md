# 🎤 Final Project Presentation Script — Responsive Kanban Task Board

## 👋 Introduction

Hi, I’m **Ismaeel Arendse**, and this is my final Kanban Task Board project.  
It started as a **Figma design provided by my code teacher**, and over **four weeks** we developed it step-by-step, adding new functionality each week until we reached this final version.

It’s built with **HTML**, **CSS**, and **vanilla JavaScript**, and matches the Figma spec in both layout and interactivity.

---

## 📅 Project Timeline

**Week 1 – Base Layout:**  
Static HTML structure for the board, matching the Figma spacing, colors, and components.

**Week 2 – Responsive Styling:**  
CSS Grid, Flexbox, and media queries to match responsive breakpoints.

**Week 3 – Task Rendering Logic:**  
JavaScript to dynamically render tasks from an array.

**Week 4 – Final Functionality:**  
Modal-based CRUD, local storage, theme toggle, and collapsible sidebar.

---

## 🗂 HTML Structure

The HTML follows the Figma hierarchy exactly:

- **Sidebar:** Logo, board list, theme toggle, and hide button.
- **Header:** Current board name and “Add Task” button.
- **Main Content:** Three `.column-div` containers — **To Do**, **Doing**, and **Done** — each with a `tasks-container`.
- **Modal:** Reusable form with fields for title, description, and status (used for both adding and editing).

Each interactive element has an `id` or `data-status` so JavaScript can target it directly.

---

## 🎨 CSS Styling

CSS mirrors the Figma design with:

- **Root Variables:** Theme colors, shadows, sidebar width, and font styles.
- **Layout:** Flexbox for the app shell, CSS Grid for task columns.
- **Responsive Breakpoints:**
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- **Task Cards:** Rounded corners, shadows, and hover scaling.
- **Theme Toggle:** Matches the Figma switch with sun/moon icons.
- **Sidebar Animation:** Smooth slide-in/out transitions.

---

## ⚙️ JavaScript Functionality

Key JS features:

- **State Management:** Tasks stored in an array with `{ id, title, description, status }`.
- **Local Storage:** Loads saved tasks on page load; saves any changes instantly.
- **Render Function:** `renderTasks()` places tasks in the correct column based on `status`.
- **Modal Control:**
  - **Add Mode:** Clears form and hides delete button.
  - **Edit Mode:** Prefills form with selected task and shows delete button.
- **Column Header Counts:** Updates totals for each column dynamically.
- **Theme Toggle:** Switches light/dark mode, updates logo, and saves preference.
- **Sidebar Toggle:** Handles desktop vs mobile states and remembers them.

---

## 🛠 Developer Workflow

The project was built iteratively:

1. Start with **design fidelity** from Figma.
2. Layer in **responsive layout**.
3. Add **interactivity** with JavaScript.
4. Finalize with **data persistence** and UI polish.

---

## ✅ Closing

This is the final evolution of a static Figma translation into a **fully functional, responsive Kanban board** with:

- CRUD operations
- Theming
- Local storage persistence

**Thanks for reading — Ismaeel Arendse**
