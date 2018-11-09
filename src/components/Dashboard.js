import React, { Component } from "react";
import ".././css/Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { globalUrl } from './types';

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

    let componentListaArtigos = [];

    for (let x = 0; x < listaArtigos.length; x++) {
      let image = listaArtigos[x].imagem;

      let BtnEdit = localStorage.getItem("jwtToken") ? (
        <button
          style={{
            position: "absolute",
            top: 0,
            cursor: "pointer",
            zIndex: 9
          }}
          onClick={() => this.navegarParaEditar(x)}
        >
          Editar
        </button>
      ) : null;

      componentListaArtigos.push(
        <div className="article-card" key={x}>
          {BtnEdit}

          <div onClick={() => this.navegarParaArtigos(x)}>
            <h2>{listaArtigos[x].titulo}</h2>
            <div className="article-card-content">
              <img
                src={image}
                className="image-card-article"
                width="80"
                height="150"
                alt="colocar alt via props usando redux"
              />
              <p className="subtitle-card-article">
                {listaArtigos[x].subtitulo} 2
              </p>
            </div>
          </div>
        </div>
      );
    }

    return <div>{componentListaArtigos}</div>;
  }

  veryLogin = () => {
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
    return (
      <div className="root-dashboard">
        {this.veryLogin()}
        <div id="lista-artigos">{lista}</div>
      </div>
    );
  }
}

export default Dashboard;
