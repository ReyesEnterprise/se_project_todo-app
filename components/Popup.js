class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    // this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    console.log(this._popupCloseBtn);
    // this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      console.log(this);
      console.log(`the evt.key is:${evt.key}`);
    }
  }

  setEventListeners() {
    // this._popupCloseBtn.addEventListener("click", () => {
    //   this.close();
    // });

    this._popupElement.addEventListener("mousedown", (evt) => {
      console.log(evt.target.classList);
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
