import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "../images/logo_menu.png";
import "../App.css";
import axios from "axios";
import { globalUrl } from './types';


let texto = "";
let index = '';

class Artigo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      subtitle: "",
      image: `${globalUrl}images/`,
      texto: "",
      autor: "",
      data_criacao: ""
    };

    index = this.props.match.params.id;
  }

  componentDidMount() {    
    const url = `${globalUrl}artigo/${index}`;

    axios.get(url).then(response => {
    
      document.title = response.data.titulo;
      this.setState({
        title: response.data.titulo,
        subtitle: response.data.subtitulo,
        image: response.data.imagem,
        autor: response.data.autor,
        data_criacao: response.data.data_criacao
      });
      


      this.setState({ texto: response.data.texto });
    });
  }

  renderDOM(element) {
    ReactDOM.render(element, document.getElementsByClassName("root"));
  }

  render() {
    texto = (
      <div
        className="div-texto"
        style={{ paddingLeft: 200, paddingRight: 200 }}
        dangerouslySetInnerHTML={{ __html: this.state.texto }}
      />
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
          <h2 className="App-subtitle">{this.state.subtitle}</h2>
        </header>

        <div id="autor_criacao">
          <p>Autor: {this.state.autor}</p>

          <p>Data: {this.state.data_criacao}</p>
        </div>

        <img src={this.state.image} className="Image-capa" alt="capa-artigo" style={{ marginBottom: 15 }} />

        {texto}
      </div>
    );
  }
}

export default Artigo;
