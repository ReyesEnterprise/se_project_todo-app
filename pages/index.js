// external imports
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// internal imports
import { initialTodos, validationConfig } from "../utils/constants.js";

// export default - imports
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

// const elements (html elements selected from Dom)
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
// const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// instance of a class
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});
// calling a method of a class
addTodoPopup.setEventListeners();

// function that creats a new instance of a class and pass data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

// Event Listeners
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
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
  section.addItem(todo);
  addTodoPopup.close();

  // restting the form and disabaling the button
  newTodoValidator.resetValidation();
});

// instance of section class and passes the initialTodos
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
// call of the sections method renderItems
section.rendererItems();

// new instance of FormValidator
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
// call of the FormValidators method  enableValidation
newTodoValidator.enableValidation();
