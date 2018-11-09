import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { globalUrl } from './types';

import "../css/EditarArtigo.css";
import {
  modificaTitulo,
  modificaSubtitulo,
  modificaAutor,
  modificaTexto,
  modificaEvent,
  editaArtigo,
  reiniciarEstado,
  modificaImagem
} from "./../actions/NovoArtigoAction";

class EditarArtigo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagem: ""
    };

    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/login-wp-admins-secret");
    }
  }

  componentDidMount() {
    const index = localStorage.getItem("currentArticle");

    const url = `${globalUrl}artigo/${index}`;

    axios.get(url).then(response => {
      console.log(response.data);
      this.props.modificaTitulo(response.data.titulo);
      this.props.modificaSubtitulo(response.data.subtitulo);
      this.props.modificaAutor(response.data.autor);
      this.props.modificaTexto(response.data.texto);
      this.props.modificaImagem(response.data.imagem)
    });

    this.setState({
      imagem: this.props.imagem
    });

    this.props.reiniciarEstado();
  }

  handleImage(event) {
    this.props.modificaEvent(event.target.files[0]);
    var output = document.getElementById("imageArticle");
    output.src = URL.createObjectURL(event.target.files[0]);
  }

  _editarArtigo() {
    const index = localStorage.getItem("currentArticle");
    this.props.editaArtigo(
      this.props.event,
      this.props.titulo,
      this.props.subtitulo,
      this.props.data_criacao,
      this.props.autor,
      this.props.texto,
      index,
      this.state.imagem
    );
  }

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

          <h3>Imagem atual</h3>
          <img
            src={this.props.imagem}
            style={{ width: 95, height: 95 }}
            id="imageArticle"
          />

          <br />

          <input
            type="file"
            onChange={event => {
              this.handleImage(event);
            }}
          />
        </form>
        <button onClick={() => this._editarArtigo()}>Adicionar</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  titulo: state.NovoArtigoReducer.titulo,
  subtitulo: state.NovoArtigoReducer.sub,
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
    editaArtigo,
    reiniciarEstado,
    modificaImagem
  }
)(EditarArtigo);
