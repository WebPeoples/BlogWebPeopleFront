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

  navegarParaArtigos(alias) {
    alias = alias.split('?').join('%3F')
    localStorage.setItem("currentArticle", alias);
    this.props.history.push({
      pathname: `/artigo/${alias}`
    });
  }

  navegarParaEditar(alias) {
    alias = alias.split('?').join('%3F')
    localStorage.setItem("currentArticle", alias);
    this.props.history.push({
      pathname: `/editar-artigo/${alias}`
    });
  }

  componentDidMount() {
    
    document.title = "Blog WebPeople";
    axios.get(`${globalUrl}ListaArtigos`).then(data => {
      console.log(data.data)
      this.setState({ listaArtigos: data.data });
    });
  }

  renderizaListaItens() {
    const listaArtigos = this.state.listaArtigos;
    console.log(listaArtigos);

    let componentListaArtigos = [];

    for (let x = 0; x < listaArtigos.length; x++) {
      let image = listaArtigos[x].imagem;
      console.log(listaArtigos[x].id)
      let BtnEdit = localStorage.getItem("jwtToken") ? (
        <Button
          bsStyle="primary"
          onClick={() => this.navegarParaEditar(listaArtigos[x].alias)}
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
                onClick={() => this.navegarParaArtigos(listaArtigos[x].alias)}
              >
                {listaArtigos[x].titulo}
              </h2>
              <p
                className="subtitle-card-article"
                onClick={() => this.navegarParaArtigos(listaArtigos[x].alias)}
              >
                {listaArtigos[x].subtitulo}
              </p>
              <p className="autor-card-article">Autor: {listaArtigos[x].autor}</p>
              <p className="data-card-article">Criado: {listaArtigos[x].created_at}</p>
            </div>

            <Image
              onClick={() => this.navegarParaArtigos(listaArtigos[x].alias)}
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
