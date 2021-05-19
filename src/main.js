import { Store } from "./store";

class AppController {
  constructor(store) {
    this.store = store;
    //
    this.render = this.render.bind(this);
    this.reducer = this.reducer.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
    // init
    this.store.register(this.reducer);
    this.store.subscribe(this.render);
    this.store.dispatch({ type: "RESET", payload: 10 });
  }

  render(store) {
    let app = document.querySelector("#app");
    app.classList.add("container");
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
    let countEle = document.createElement("p");
    countEle.innerHTML = JSON.stringify(store.counter);
    let btnEle = document.createElement("button");
    btnEle.innerText = "click me";
    btnEle.addEventListener("click", this.onBtnClick.bind(this));
    app.appendChild(countEle);
    app.appendChild(btnEle);
    return app;
  }

  onBtnClick(e) {
    this.store.dispatch({ type: "INCREMENT" });
  }

  reducer(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return {
          ...state,
          counter: state.counter + 1,
        };
      case "DECREMENT":
        return {
          ...state,
          counter: state.counter - 1,
        };
      case "RESET":
        return {
          ...state,
          counter: action.payload,
        };
      default:
        return state;
    }
  }
}

function main() {
  let store = new Store();
  let appController = new AppController(store);
}
main();
