import axios from 'axios';

// El parámetro es un objeto que representa un empleado
export const altaTipoJornadaApi = ( tipo ) => {
    console.log("en altaTipoJornada: " + tipo);
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/api/tiposjornada', {
            tipo: tipo
        }).then(response => {
            console.log(response);
            return resolve(response.data);
        }).catch(error => {
            return reject(error);
        });
    });
}

export const getTiposJornadaApi = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/api/tiposjornada')
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
        axios.get(`http://localhost:5000/api/tiposjornadaByTipo/${ tipo }`)
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const borrarTipoJornadaApi = ( id ) => {
    return new Promise((resolve, reject) => {
        console.log(id);
        axios.delete(`http://localhost:5000/api/tiposjornada/${id}`)
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}