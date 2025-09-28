// external imports
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// our imports
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

// open and close Modeal functions
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

// Event Listeners
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// submit form listener
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  // creating unique id propertie
  const id = uuidv4();

  // creating complete propertie
  const completed = false;

  // needs properties of id and completed
  const values = { name, date, id, completed };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);

  // restting the form and disabaling the button
  newTodoVali.resetValidation();
});

// array loop
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

// new instance of FormValidator
const newTodoVali = new FormValidator(validationConfig, addTodoForm);
newTodoVali.enableValidation();
