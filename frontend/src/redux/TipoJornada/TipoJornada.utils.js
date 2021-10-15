import axios from 'axios';
import { token } from '../../token';

// El parámetro es un objeto que representa un empleado
export const altaTipoJornadaApi = ( tipo ) => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.post('http://localhost:5000/api/tiposjornada', 
            {
                tipo: tipo
            },
            { headers }
        ).then(response => {
            console.log(response);
            return resolve(response.data);
        }).catch(error => {
            return reject(error);
        });
    });
}

export const getTiposJornadaApi = () => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.get('http://localhost:5000/api/tiposjornada', { headers })
        .then( response => {
            console.log(response);
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const getTiposJornadaApiByTipo = ( tipo ) => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.get(`http://localhost:5000/api/tiposjornadaByTipo/${ tipo }`, { headers })
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const borrarTipoJornadaApi = ( id ) => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.delete(`http://localhost:5000/api/tiposjornada/${id}`, { headers })
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}