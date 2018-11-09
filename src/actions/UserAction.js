import axios from 'axios';
import { MODIFICA_EMAIL, MODIFICA_PASSWORD, globalUrl, SIGNIN_COMPLETE } from '../components/types';

export const modificaEmail = texto => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaPassword = texto => {
    return {
        type: MODIFICA_PASSWORD,
        payload: texto
    }
}

export const signin = (email, password) => {
    const data = {email, password}
    
    return dispatch => {
        axios.post(`${globalUrl}signin`, data)
            .then(res => {
                dispatch({
                    type: SIGNIN_COMPLETE,
                    payload: true
                })
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);


            });
    }
}