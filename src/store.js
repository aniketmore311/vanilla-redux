export class Store {
  constructor() {
    this.state = null;
    this.reducers = [];
    this.subscribers = [];
    this.register = this.register.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }
  register(reducer) {
    this.reducers.push(reducer);
  }
  subscribe(fn) {
    this.subscribers.push(fn);
  }
  dispatch(action) {
    for (let reducer of this.reducers) {
      this.state = reducer(this.state, action);
    }
    console.log(action, this.state);
    for (let subscriber of this.subscribers) {
      subscriber(this.state);
    }
  }
}
