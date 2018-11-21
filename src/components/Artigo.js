import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "../images/logo_menu.png";
import "../App.css";
import axios from "axios";
import { globalUrl } from "./types";
import { Grid, Row, Col } from "react-bootstrap";

import NavBar from "./VisualComponents/NavBar.jsx";

let texto = "";
let index = "";

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
        data_criacao: response.data.created_at
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
        dangerouslySetInnerHTML={{ __html: this.state.texto }}
      />
    );

    return (
      <div>
        <NavBar />
        <div className="App">
          <Grid className="App-header">
            <Row>
              <Col xs={12} md={12}>
                <h2 className="App-title">{this.state.title}</h2>

                <div id="autor_criacao">
                  <p>Por: {this.state.autor} <br/> Criado: {this.state.data_criacao}</p>
                </div>
                
                <img
                  src={this.state.image}
                  className="Image-capa"
                  alt="capa-artigo"
                  style={{ marginBottom: 15 }}
                />

                <h5 className="App-subtitle">{this.state.subtitle}</h5>
              </Col>
            </Row>
            {texto}
          </Grid>

          
        </div>
      </div>
    );
  }
}

export default Artigo;
