class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = document.querySelector(selector);
  }

  _getDate() {
    // // If a due date has been set, parsing this it with `new Date` will return a
    // // number. If so, we display a string version of the due date in the todo.
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;

    // // Apply id and for attributes.
    // // The id will initially be undefined for new todos.
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    // EventListener for checkbox
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      console.log(this._data.completed);
    });

    // EventListener for delete button
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  getView() {
    this._todoElement = this._selector.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    // Assining the todoNameEl to this._data.name
    this._todoNameEl.textContent = this._data.name;

    // Clalling the mothods  this._generateCheckboxEl(); & this._setEventListeners();
    this._getDate();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
