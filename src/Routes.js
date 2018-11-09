import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
import firebase from "firebase/app";
import axios from "axios";
import { globalUrl } from "./components/types";

import Artigo from "./components/Artigo";
import Dashboard from "./components/Dashboard";
import NovoArtigo from "./components/NovoArtigo/NovoArtigo";
import EditarArtigo from "./components/EditarArtigo";
import LoginForm from "./components/LoginForm/LoginForm";

export default class extends Component {
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBUxkNXJUxA5bbqnE7B60hHoDSuLiwWpxY",
      authDomain: "blog-webpeople.firebaseapp.com",
      databaseURL: "https://blog-webpeople.firebaseio.com",
      projectId: "blog-webpeople",
      storageBucket: "blog-webpeople.appspot.com",
      messagingSenderId: "322208106644"
    };
    firebase.initializeApp(config);

    
  }

  validadeToken() {
    let token = localStorage.getItem("jwtToken");

    if (token) {
      axios.post(`${globalUrl}validateToken`, { token }).then(res => {
        console.log(res)
        if (res.data) {
          axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
          )
            ? `bearer ${localStorage.getItem("jwtToken")}`
            : "";

          return true;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("jwtToken");

          return false;
        }
      });
    }
  }

  render() {
    this.validadeToken();
    return (
      <Switch>
        <Route path="/artigo/:id" component={Artigo} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/novo-artigo" component={NovoArtigo} />
        <Route path="/login-wp-admins-secret" component={LoginForm} />
        <Route path="/editar-artigo" component={EditarArtigo} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    );
  }
}
