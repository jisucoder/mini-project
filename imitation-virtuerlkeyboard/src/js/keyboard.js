export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseup.bind(this));
  }

  #onMouseup(event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[0-9a-zA-Z]/g, "");
  }
  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    // 여기코드!!
    if (/[0-9a-zA-Z]/g.test(event.key)) {
      this.#inputGroupEl.classList.add("error");
    }
    if (/Process/.test(event.key)) {
      this.#inputGroupEl.classList.remove("error");
    }
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onChangeTheme(event) {
    console.log(event.target.checked);
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    ); //document.documentElement <html>요소 반환
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
