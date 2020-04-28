export default class Thenable {
  constructor(callback) {
    this.callback = callback;
  }

  then(fn) {
    fn(this.callback(this));
  }
}
