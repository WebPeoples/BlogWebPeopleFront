import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";

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

class NovoArtigo extends Component {
  constructor(props) {
    super(props);
    this.props.reiniciarEstado();
  }

  _adicionaArtigo() {
    if (
      this.props.titulo !== "" &&
      this.props.sub !== "" &&
      this.props.autor !== "" &&
      this.props.texto !== ""
    ) {
      this.props.adicionaArtigo(
        this.props.event,
        this.props.titulo,
        this.props.sub,
        this.props.data_criacao,
        this.props.autor,
        this.props.texto
      );
    } else {
      alert("Há campos obrigatórios não preenchidos")
    }
  }

  handleImage = event => {
    this.props.modificaEvent(event.target.files[0]);
    var output = document.getElementById("imageNovoArtigo");
    output.src = URL.createObjectURL(event.target.files[0]);
  };

  render() {

    return (
      <div className="root-novo-artigo">
        <form>
          <label>Título</label>
          <br />
          <input
            name="titulo"
            id="titulo"
            placeholder="titulo"
            onChange={event => this.props.modificaTitulo(event.target.value)}
            value={this.props.titulo}
          />

          <br />

          <label>Subtítulo</label>
          <br />
          <input
            name="subtitulo"
            id="subtitulo"
            placeholder="subtitulo"
            onChange={event => this.props.modificaSubtitulo(event.target.value)}
            value={this.props.subtitulo}
          />

          <br />

          <label>Autor</label>
          <br />
          <input
            name="autor"
            id="autor"
            placeholder="autor"
            onChange={event => this.props.modificaAutor(event.target.value)}
            value={this.props.autor}
          />

          <br />

          <label>Texto</label>
          <br />
          <textarea
            name="texto"
            id="texto"
            placeholder="texto"
            rows="10"
            onChange={event => this.props.modificaTexto(event.target.value)}
            value={this.props.texto}
          />

          <br />

          <img id="imageNovoArtigo" />
          <br/>

          <input type="file" onChange={this.handleImage} />
        </form>
        <button onClick={() => this._adicionaArtigo()}>Adicionar</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  titulo: state.NovoArtigoReducer.titulo,
  sub: state.NovoArtigoReducer.sub,
  data_criacao: state.NovoArtigoReducer.data_criacao,
  imagem: state.NovoArtigoReducer.imagem,
  autor: state.NovoArtigoReducer.autor,
  texto: state.NovoArtigoReducer.texto,
  event: state.NovoArtigoReducer.event
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
