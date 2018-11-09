import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import axios from "axios";

import { globalUrl } from "./components/types";
import Routes from "./Routes";
import reducers from "./reducers";

export default class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Provider
          store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
        >
          <HashRouter>
            <Routes />
          </HashRouter>
        </Provider>
      </div>
    );
  }
}
