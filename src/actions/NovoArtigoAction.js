import {
  MODIFICA_TITULO,
  MODIFICA_SUBTITULO,
  MODIFICA_AUTOR,
  MODIFICA_TEXTO,
  MODIFICA_EVENT,
  ADICIONA_ARTIGO_COM_SUCESSO,
  ADICIONA_ARTIGO_ERRO,
  REINICIAR_ESTADO,
  globalUrl,
  MODIFICA_IMAGEM
} from "../components/types";

import axios from "axios";
import firebase from "firebase";




export const reiniciarEstado = () => {
  return {
    type: REINICIAR_ESTADO
  }
}

export const modificaTitulo = texto => {
  return {
    type: MODIFICA_TITULO,
    payload: texto
  };
};

export const modificaSubtitulo = texto => {
  return {
    type: MODIFICA_SUBTITULO,
    payload: texto
  };
};

export const modificaAutor = texto => {
  return {
    type: MODIFICA_AUTOR,
    payload: texto
  };
};

export const modificaTexto = texto => {
  return {
    type: MODIFICA_TEXTO,
    payload: texto
  };
};

export const modificaImagem = imagem => {
  return {
    type: MODIFICA_IMAGEM,
    payload: imagem
  }
}

export const modificaEvent = event => {
  console.log(event);
  return {
    type: MODIFICA_EVENT,
    payload: event
  };
};

export const adicionaArtigo = (
  event,
  titulo,
  subtitulo,
  data_criacao,
  autor,
  texto
) => {
  return dispatch => {
    uploadImage(
      event,
      titulo,
      subtitulo,
      data_criacao,
      autor,
      texto,
      dispatch,
      "AdicionaArtigo"
    );
  };
};

export const editaArtigo = (
  event,
  titulo,
  subtitulo,
  data_criacao,
  autor,
  texto,
  index,
  imagem
) => {
  return dispatch => {
    uploadImage(
      event,
      titulo,
      subtitulo,
      data_criacao,
      autor,
      texto,
      dispatch,
      "EditaArtigo",
      index,
      imagem
    );
  };
};


const uploadImage = (
  event,
  titulo,
  subtitulo,
  data_criacao,
  autor,
  texto,
  dispatch,
  editOrInsert,
  index,
  imagem
) => {
  console.log("uploadImage", event);
  if (event.name != null) {
    var storageRef = firebase.storage().ref();

    const metadata = {
      contentType: event.type
    };

    let uploadTask = storageRef
      .child("images/" + event.name + Date.now())
      .put(event, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;

          case "storage/invalid-argument":
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          const data = {
            titulo,
            subtitulo,
            data_criacao,
            autor,
            texto,
            imagem: downloadURL,
            index
          };

          axios.post(`${globalUrl}${editOrInsert}`, data).then(res => {
            console.log(res);
            if (res === 200) {
              dispatch({
                type: ADICIONA_ARTIGO_COM_SUCESSO,
                payload: 200
              });
            } else {
              dispatch({
                type: ADICIONA_ARTIGO_ERRO,
                payload: 500
              });
            }
          });
        });
      }
    );
  } else {
    const data = {
      titulo,
      subtitulo,
      data_criacao,
      autor,
      texto,
      index,
      imagem
    };

    axios.post(`${globalUrl}${editOrInsert}`, data).then(res => {
      console.log(res);
      if (res === 200) {
        dispatch({
          type: ADICIONA_ARTIGO_COM_SUCESSO,
          payload: 200
        });
      } else {
        dispatch({
          type: ADICIONA_ARTIGO_ERRO,
          payload: 500
        });
      }
    });
  }
};
