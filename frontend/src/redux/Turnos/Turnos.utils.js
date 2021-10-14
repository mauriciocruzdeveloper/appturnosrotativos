import axios from 'axios';

// El parámetro es un objeto que representa un empleado
export const altaTurnosApi = ( dia, mes, anio, empleado, horario, tipoJornada ) => {
    console.log("en altaTurnos: " + dia, mes, anio, empleado, horario, tipoJornada );
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/api/turnos', {
            dia: dia,
            mes: mes,
            anio: anio,
            empleado: empleado,
            horario: horario,
            tipoJornada: tipoJornada
        }).then(response => {
            console.log(response);
            return resolve(response.data);
        }).catch(error => {
            return reject(error);
        });
    });
}

export const getTurnosApi = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/api/turnos')
        .then( response => {
            console.log(response);
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const getTurnosPorMesApi = (anio, mes) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/api/turnosByMes/${ anio }/${ mes }`)
        .then( response => {
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const getTurnosApiByTipo = ( tipo ) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/api/turnosByTipo/${ tipo }`)
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const borrarTurnosApi = ( id ) => {
    return new Promise((resolve, reject) => {
        console.log(id);
        axios.delete(`http://localhost:5000/api/turnos/${id}`)
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}