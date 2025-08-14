// ==============================
// Local Storage Module
// ==============================
function loadTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [
    { id: 1, title: "Launch Epic Career 🚀", description: "Epic journey begins", status: "todo" },
    { id: 2, title: "Conquer React⚛️", description: "Learn React fundamentals", status: "todo" },
    { id: 3, title: "Understand Databases⚙️", description: "Learn about SQL and NoSQL", status: "todo" },
    { id: 4, title: "Crush Frameworks🖼️", description: "Explore popular UI frameworks", status: "todo" },
    { id: 5, title: "Master JavaScript 💛", description: "Become a JS ninja", status: "doing" },
    { id: 6, title: "Never Give Up 🏆", description: "Stay motivated", status: "doing" },
    { id: 7, title: "Explore ES6 Features 🚀", description: "Learn modern JS syntax", status: "done" },
    { id: 8, title: "Have fun 🥳", description: "Enjoy coding", status: "done" },
  ];
}
function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==============================
// State & Elements
// ==============================
let tasks = loadTasksFromStorage();
let editingTaskId = null;

const todoContainer = document.getElementById("todo-tasks");
const doingContainer = document.getElementById("doing-tasks");
const doneContainer = document.getElementById("done-tasks");

const modal = document.getElementById("task-modal");
const modalTitleInput = document.getElementById("modal-title");
const modalDescInput = document.getElementById("modal-description");
const modalStatusSelect = document.getElementById("modal-status");
const closeModalBtn = document.getElementById("close-modal");
const saveTaskBtn = document.getElementById("save-task");
const modalHeader = document.getElementById("modal-header");
const deleteTaskBtn = document.getElementById("delete-task");

const launchCareerBtn = document.getElementById("launchCareerBtn");
const addTaskBtn = document.getElementById("add-task-btn");

// ==============================
// Render
// ==============================
function renderTasks() {
  todoContainer.innerHTML = "";
  doingContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";
    taskDiv.textContent = task.title;
    taskDiv.dataset.taskId = task.id;
    taskDiv.addEventListener("click", () => openModal(task.id));

    if (task.status === "todo") todoContainer.appendChild(taskDiv);
    else if (task.status === "doing") doingContainer.appendChild(taskDiv);
    else if (task.status === "done") doneContainer.appendChild(taskDiv);
  });

  updateColumnHeaders();
}
function updateColumnHeaders() {
  document.getElementById("toDoText").textContent = `TODO (${tasks.filter(t => t.status === "todo").length})`;
  document.getElementById("doingText").textContent = `DOING (${tasks.filter(t => t.status === "doing").length})`;
  document.getElementById("doneText").textContent = `DONE (${tasks.filter(t => t.status === "done").length})`;
}

// ==============================
// Modal Controls
// ==============================
function showModal() {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  editingTaskId = null;
}
function openAddModal() {
  editingTaskId = null;
  modalHeader.textContent = "Add Task";
  modalTitleInput.value = "";
  modalDescInput.value = "";
  modalStatusSelect.value = "todo";
  deleteTaskBtn.classList.add("hidden");
  showModal();
}
function openModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  editingTaskId = taskId;
  modalHeader.textContent = "Edit Task";
  modalTitleInput.value = task.title;
  modalDescInput.value = task.description;
  modalStatusSelect.value = task.status;
  deleteTaskBtn.classList.remove("hidden");
  showModal();
}

// ==============================
// Save & Delete Logic
// ==============================
function saveTask() {
  const title = modalTitleInput.value.trim();
  const description = modalDescInput.value.trim();
  const status = modalStatusSelect.value;
  if (!title || !description) {
    alert("Please enter both a title and description.");
    return;
  }
  if (editingTaskId === null) {
    const maxId = tasks.length ? Math.max(...tasks.map(t => t.id)) : 0;
    tasks.push({ id: maxId + 1, title, description, status });
  } else {
    const task = tasks.find(t => t.id === editingTaskId);
    if (!task) return;
    task.title = title;
    task.description = description;
    task.status = status;
  }
  saveTasksToStorage();
  renderTasks();
  closeModal();
}
deleteTaskBtn.addEventListener("click", () => {
  if (editingTaskId === null) return;
  if (!confirm("Are you sure you want to delete this task?")) return;
  tasks = tasks.filter(t => t.id !== editingTaskId);
  saveTasksToStorage();
  renderTasks();
  closeModal();
});

// ==============================
// Events
// ==============================
addTaskBtn.addEventListener("click", openAddModal);
launchCareerBtn.addEventListener("click", openAddModal);
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
saveTaskBtn.addEventListener("click", saveTask);

// ==============================
// Init
// ==============================
renderTasks();

// ==============================
// Theme & Sidebar Controls
// ==============================
const themeSwitch = document.getElementById("theme-switch");
const appLogo = document.getElementById("app-logo");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
const showSidebarBtn = document.getElementById("show-sidebar-btn");

// --- Theme state helpers ---
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  themeSwitch.checked = isDark;
  appLogo.src = isDark ? "assets/logo-dark.svg" : "assets/logo-light.svg";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load & apply saved theme on boot
applyTheme(localStorage.getItem("theme") || "light");

// Sidebar state: desktop default = shown, mobile default = hidden (cleaner)
function setSidebarState({ desktopHidden = false, mobileShown = false } = {}) {
  document.body.classList.toggle("sidebar-hidden", desktopHidden); // desktop
  document.body.classList.toggle("sidebar-shown", mobileShown);    // mobile/tablet
  localStorage.setItem("sidebarDesktopHidden", desktopHidden ? "1" : "0");
  localStorage.setItem("sidebarMobileShown", mobileShown ? "1" : "0");
}

// Init sidebar state from storage
setSidebarState({
  desktopHidden: localStorage.getItem("sidebarDesktopHidden") === "1",
  mobileShown: localStorage.getItem("sidebarMobileShown") === "1",
});

// --- Listeners ---
// Desktop sidebar toggle (Hide inside sidebar)
if (hideSidebarBtn) {
  hideSidebarBtn.addEventListener("click", () => {
    // On desktop: hide; On mobile: close
    if (window.innerWidth > 1023) {
      setSidebarState({
        desktopHidden: true,
        mobileShown: false
      });
    } else {
      setSidebarState({
        desktopHidden: false,
        mobileShown: false
      });
    }
  });
}

// Floating "Show Sidebar" button
if (showSidebarBtn) {
  showSidebarBtn.addEventListener("click", () => {
    if (window.innerWidth > 1023) {
      setSidebarState({
        desktopHidden: false,
        mobileShown: false
      });
    } else {
      setSidebarState({
        desktopHidden: false,
        mobileShown: true
      });
    }
  });
}

// Theme toggle (sidebar switch)
if (themeSwitch) {
  themeSwitch.addEventListener("change", () => {
    applyTheme(themeSwitch.checked ? "dark" : "light");
  });
}

// Mobile favicon quick theme toggle
if (mobileThemeToggle) {
  mobileThemeToggle.style.cursor = "pointer";
  mobileThemeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(next);
  });
}

// Keep sidebar state responsive when resizing (optional nicety)
window.addEventListener("resize", () => {
  // If moving to desktop and sidebar was mobile-shown but desktop-hidden, reveal desktop.
  if (window.innerWidth > 1023) {
    const desktopHidden = localStorage.getItem("sidebarDesktopHidden") === "1";
    setSidebarState({
      desktopHidden,
      mobileShown: false
    });
  } else {
    // On mobile, don't auto-open; keep persisted mobileShown.
    const mobileShown = localStorage.getItem("sidebarMobileShown") === "1";
    setSidebarState({
      desktopHidden: false,
      mobileShown
    });
  }
});

