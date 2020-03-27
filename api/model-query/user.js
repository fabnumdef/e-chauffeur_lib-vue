import Thenable from '../abstract/thenable';

export default class User extends Thenable {
  setSendToken(sendToken = true) {
    this.sendToken = sendToken;
    return this;
  }
}
