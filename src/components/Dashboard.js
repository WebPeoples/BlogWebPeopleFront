import React, { Component } from "react";
import ".././css/Dashboard.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { globalUrl } from "./types";
import { Grid, Col, Row, Image, Button } from "react-bootstrap";

import NavBar from "./VisualComponents/NavBar.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listaArtigos: "",
      image: globalUrl,
      articleIndex: ""
    };
  }

  navegarParaArtigos(index) {
    localStorage.setItem("currentArticle", index);
    this.props.history.push({
      pathname: `/artigo/${index}`
    });
  }

  navegarParaEditar(index) {
    localStorage.setItem("currentArticle", index);
    this.props.history.push({
      pathname: `/editar-artigo/${index}`
    });
  }

  componentDidMount() {
    axios.get(`${globalUrl}ListaArtigos`).then(data => {
      this.setState({ listaArtigos: data.data });
    });
  }

  renderizaListaItens() {
    const listaArtigos = this.state.listaArtigos;
    console.log(listaArtigos);

    let componentListaArtigos = [];

    for (let x = 0; x < listaArtigos.length; x++) {
      let image = listaArtigos[x].imagem;

      let BtnEdit = localStorage.getItem("jwtToken") ? (
        <Button
          bsStyle="primary"
          onClick={() => this.navegarParaEditar(listaArtigos[x].id)}
          className="btnEditar"
        >
          EDITAR
        </Button>
      ) : null;

      componentListaArtigos.push(
        <Col xs={11} md={11} className="article-card" key={x} activeKey>
          <div>
            <div className="div-title-subtitle">
              <h2
                className="title-article"
                onClick={() => this.navegarParaArtigos(listaArtigos[x].id)}
              >
                {listaArtigos[x].titulo}
              </h2>
              <p
                className="subtitle-card-article"
                onClick={() => this.navegarParaArtigos(listaArtigos[x].id)}
              >
                {listaArtigos[x].subtitulo}
              </p>
              <p className="autor-card-article">Autor: {listaArtigos[x].autor}</p>
              <p className="data-card-article">Criado: {listaArtigos[x].created_at}</p>
            </div>

            <Image
              onClick={() => this.navegarParaArtigos(listaArtigos[x].id)}
              src={image}
              className="image-card-article"
              responsive
              alt="colocar alt via props usando redux"
            />

            {BtnEdit}
          </div>
        </Col>
      );
    }

    return <Row className="rowListaArtigo">{componentListaArtigos}</Row>;
  }

  verifyLogin = () => {
    if (localStorage.getItem("jwtToken")) {
      return (
        <div id="left-menu">
          <div>
            <img
              id="logo-image"
              src="./images/logo_menu.png"
              alt="colocar alt via props usando redux"
            />
          </div>
          <ul>
            <li>
              <Link to="/novo-artigo">
                <img
                  style={{ marginRight: 5 }}
                  src="./images/plus.png"
                  width="20"
                  height="20"
                  alt="colocar alt via props usando redux"
                />
                Novo Artigo
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const lista = this.renderizaListaItens();
    return  (
      // <div className="root-dashboard">
      //   {this.veryLogin()}
      //   <div id="lista-artigos">{lista}</div>
      // </div>

      <div className="root-dashboard">
        <NavBar />
        {/* {this.verifyLogin()} */}
        <Grid>{lista}</Grid>
      </div>
    );
  }
}

export default Dashboard;
