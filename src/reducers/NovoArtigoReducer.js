import {
  MODIFICA_TITULO,
  MODIFICA_SUBTITULO,
  MODIFICA_AUTOR,
  MODIFICA_TEXTO,
  MODIFICA_EVENT,
  REINICIAR_ESTADO,
  MODIFICA_IMAGEM
} from "../components/types";

const INITIAL_STATE = {
  titulo: "",
  sub: "",
  data_criacao: "",
  imagem: "",
  autor: "",
  texto: "",
  event: {}
};

export default (state = INITIAL_STATE, action) => {
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
      return { ...state, imagem: action.payload}
    
    case MODIFICA_EVENT:
      return { ...state, event: action.payload }    

    case REINICIAR_ESTADO: 
      return state = INITIAL_STATE;
    
    default: return state;
  }
};
