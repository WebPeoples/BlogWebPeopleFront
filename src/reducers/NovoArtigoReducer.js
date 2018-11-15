import {
  MODIFICA_TITULO,
  MODIFICA_SUBTITULO,
  MODIFICA_AUTOR,
  MODIFICA_TEXTO,
  MODIFICA_EVENT,
  REINICIAR_ESTADO,
  MODIFICA_IMAGEM,
  ADICIONA_ARTIGO_ERRO,
  ADICIONA_ARTIGO_COM_SUCESSO,
  PROGRESS_BAR,
  EDITANDO_ARTIGO
} from "../components/types";

const INITIAL_STATE = {
  titulo: "",
  sub: "",
  data_criacao: "",
  imagem: "",
  autor: "",
  texto: "",
  event: {},
  errorMsg: "",
  addIsOk: false,
  progressBar: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case MODIFICA_TITULO:
      return { ...state, titulo: action.payload };

    case MODIFICA_SUBTITULO:
      return { ...state, sub: action.payload };

    case MODIFICA_AUTOR:
      return { ...state, autor: action.payload };

    case MODIFICA_TEXTO:
      return { ...state, texto: action.payload };

    case MODIFICA_IMAGEM:
      return { ...state, imagem: action.payload };

    case MODIFICA_EVENT:
      return { ...state, event: action.payload };

    case REINICIAR_ESTADO:
      return (state = INITIAL_STATE);

    case ADICIONA_ARTIGO_ERRO:
      return { ...state, errorMsg: action.payload };

    case ADICIONA_ARTIGO_COM_SUCESSO:
      return { ...state, addIsOk: action.payload };
    
    case EDITANDO_ARTIGO:
      return { ...state, addIsOk: false, errorMsg: ''}
    
    case PROGRESS_BAR:
      return { ...state, progressBar: `fazendo upload ${action.payload.toFixed(2)}%`  }

    default:
      return state;
  }
};
