import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, FormGroup, FormControl, Label } from "react-bootstrap";

import {
  modificaTitulo,
  modificaSubtitulo,
  modificaAutor,
  modificaTexto,
  modificaEvent,
  adicionaArtigo,
  reiniciarEstado
} from "../../actions/NovoArtigoAction";
import "../.././css/NovoArtigo.css";
import NavBar from ".././VisualComponents/NavBar.jsx";

class NovoArtigo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadImage: "selecione uma imagem"
    };

    this.props.reiniciarEstado();
  }

  _adicionaArtigo() {
    this.props.adicionaArtigo(
      this.props.event,
      this.props.titulo,
      this.props.sub,
      this.props.data_criacao,
      this.props.autor,
      this.props.texto
    );
  }

  handleImage = event => {
    this.setState({ uploadImage: event.target.files[0].name });
    this.props.modificaEvent(event.target.files[0]);
    var output = document.getElementById("imageArticle");
    if (event.target.files[0]) {
      output.src = URL.createObjectURL(event.target.files[0]);
    } else {
      output.src = "";
    }
  };

  render() {
    if (this.props.addIsOk) {
      this.props.reiniciarEstado();
      return <Redirect to="dashboard" />;
    } else {
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

                  <br />
                </Col>
                <Col xs={3} md={3} style={{ marginTop: 25 }}>
                  <img id="imageArticle" alt="Imagem a ser upload" />
                  <br />
                  <label id="labelInputFile" for="uploadImage">
                    {this.state.uploadImage}
                  </label>
                  <input
                    id="uploadImage"
                    type="file"
                    onChange={this.handleImage}
                  />

                  <h4>{this.props.progressBar}</h4>
                  <h4>{this.props.errorMsg}</h4>
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
                    rows="10"
                    className="formInput"
                    onChange={event =>
                      this.props.modificaTexto(event.target.value)
                    }
                    value={this.props.texto}
                  />

                  <br />

                  <button onClick={() => this._adicionaArtigo()}>
                    Adicionar
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Grid>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  titulo: state.NovoArtigoReducer.titulo,
  sub: state.NovoArtigoReducer.sub,
  data_criacao: state.NovoArtigoReducer.data_criacao,
  imagem: state.NovoArtigoReducer.imagem,
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
    adicionaArtigo,
    reiniciarEstado
  }
)(NovoArtigo);
