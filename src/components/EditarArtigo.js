import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { globalUrl } from "./types";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, FormGroup, FormControl, Label } from "react-bootstrap";

import "../css/EditarArtigo.css";
import {
  modificaTitulo,
  modificaSubtitulo,
  modificaAutor,
  modificaTexto,
  modificaEvent,
  editaArtigo,
  reiniciarEstado,
  modificaImagem,
  modificaAlias
} from "./../actions/NovoArtigoAction";
import NavBar from "./VisualComponents/NavBar.jsx";

let aliasG = '';
let index = 0;
class EditarArtigo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagem: "",
      uploadImage: "selecione uma imagem",
      alias: ''
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/login-wp-admins-secret");
    }
    const alias = localStorage.getItem("currentArticle");

    const url = `${globalUrl}artigo/${alias}`;

    axios.get(url).then(response => {
      this.props.modificaTitulo(response.data.titulo);
      this.props.modificaSubtitulo(response.data.subtitulo);
      this.props.modificaAutor(response.data.autor);
      this.props.modificaTexto(response.data.texto);
      this.props.modificaImagem(response.data.imagem);
      index = response.data.id;
    });

    this.setState({
      imagem: this.props.imagem,
    });

    this.props.reiniciarEstado();
  }

  handleImage(event) {
    
    this.props.modificaEvent(event.target.files[0]);
    var output = document.getElementById("imageArticle");
    if (event.target.files[0]) {
      this.setState({ uploadImage: event.target.files[0].name });
      output.src = URL.createObjectURL(event.target.files[0]);
    } else {
      output.src = "";
    }
  }

  _editarArtigo() {
    
    this.props.editaArtigo(
      this.props.event,
      this.props.titulo,
      this.props.subtitulo,
      this.props.data_criacao,
      this.props.autor,
      this.props.texto,
      index,
      this.props.imagem,
      this.props.titulo.split(' ').join('-')
    );
  }

  render() {
    return (
      <div>
        <NavBar />
        <Grid className="root-novo-artigo" style={{ marginTop: 15 }}>
          <FormGroup>
            <Row>
              <Col xs={9} md={9}>
                <label>Título</label>
                <br />
                <input
                  name="titulo"
                  id="titulo"
                  placeholder="titulo"
                  className="formInput"
                  onChange={event =>
                    this.props.modificaTitulo(event.target.value)
                  }
                  value={this.props.titulo}
                />

                <br />

                <label>Subtítulo</label>
                <br />
                <input
                  name="subtitulo"
                  id="subtitulo"
                  placeholder="subtitulo"
                  className="formInput"
                  onChange={event =>
                    this.props.modificaSubtitulo(event.target.value)
                  }
                  value={this.props.subtitulo}
                />

                <br />

                <label>Autor</label>
                <br />
                <input
                  name="autor"
                  id="autor"
                  placeholder="autor"
                  className="formInput"
                  onChange={event =>
                    this.props.modificaAutor(event.target.value)
                  }
                  value={this.props.autor}
                />
              </Col>
              <Col xs={3} md={3} style={{ marginTop: 25 }}>
                <h3 style={{ textAlign: 'center'}}>Imagem atual</h3>
                <img
                  src={this.props.imagem}
                  
                  id="imageArticle"
                  alt="Imagem a ser upload"
                />

                <br />
                <label id="labelInputFile" for="uploadImage">
                  {this.state.uploadImage}
                </label>

                <input
                  id="uploadImage"
                  type="file"
                  onChange={event => {
                    this.handleImage(event);
                  }}
                />

                <h4>{this.props.progressBar}</h4>
                <h4>{this.props.errorMsg}</h4>
                <h4>{this.props.addIsOk}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <label>Texto</label>
                <br />
                <textarea
                  name="texto"
                  id="texto"
                  placeholder="texto"
                  className="formInput"
                  rows="10"
                  onChange={event =>
                    this.props.modificaTexto(event.target.value)
                  }
                  value={this.props.texto}
                />

                <br />

                <button onClick={() => this._editarArtigo()}>Adicionar</button>
              </Col>
            </Row>
          </FormGroup>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  titulo: state.NovoArtigoReducer.titulo,
  subtitulo: state.NovoArtigoReducer.sub,
  data_criacao: state.NovoArtigoReducer.data_criacao,
  imagem: state.NovoArtigoReducer.imagem,
  alias: state.NovoArtigoReducer.alias,
  autor: state.NovoArtigoReducer.autor,
  texto: state.NovoArtigoReducer.texto,
  event: state.NovoArtigoReducer.event,
  errorMsg: state.NovoArtigoReducer.errorMsg,
  addIsOk: state.NovoArtigoReducer.addIsOk,
  progressBar: state.NovoArtigoReducer.progressBar
});

export default connect(
  mapStateToProps,
  {
    modificaTitulo,
    modificaSubtitulo,
    modificaAutor,
    modificaTexto,
    modificaEvent,
    editaArtigo,
    reiniciarEstado,
    modificaImagem,
    modificaAlias
  }
)(EditarArtigo);
