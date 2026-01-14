// external imports
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// internal imports
import { initialTodos, validationConfig } from "../utils/constants.js";

// export default - imports
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// const elements (html elements selected from Dom)
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const counterSelector = document.querySelector(".counter__text");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  // A todo was removed: decrement total, and if it was completed,
  // decrement the completed count as well.
  todoCounter.updateTotal(false);
  if (completed) todoCounter.updateCompleted(false);
}

// instance of a the popupWithForm Class
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // these are all the values that need to be passed
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    const id = uuidv4();
    // then passed as an object to the generateTodo class
    const values = { name, date, id };
    // calling the generateTodo function & pass values
    const todo = generateTodo(values);
    // add to the Dom with the section class
    section.addItem(todo);
    // Update the total count for the new todo
    todoCounter.updateTotal(true);
    // close the popup
    addTodoPopup.close();
    // restting the form and disabaling the button
    newTodoValidator.resetValidation();
  },
});

// calling the popup calsses method - setEventListeners
addTodoPopup.setEventListeners();

// function that creats a new instance of a class and pass data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

// Event Listeners
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// instance of the section class and passes the initialTodos
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
// calling the section calsses methiod - rendererItems
section.rendererItems();

// new instance of FormValidator
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
// call of the FormValidators method  enableValidation
newTodoValidator.enableValidation();
