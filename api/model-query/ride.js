import Thenable from '../abstract/thenable';

export default class Ride extends Thenable {
  authWithRideToken(token) {
    this.token = token;
    return this;
  }
}
