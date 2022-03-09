export class Keyboard {
  constructor() {
    this.pressed = new Set();

    document.onkeydown = (e) => {
      this.pressed.add(e.key);
    }

    document.onkeyup = (e) => {
      this.pressed.delete(e.key);
    }
  }
}
