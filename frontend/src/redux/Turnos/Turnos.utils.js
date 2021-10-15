import axios from 'axios';
import { token } from '../../token'; // Al token lo busco aquí

// Doy de alta un empleado
export const altaTurnosApi = ( dia, mes, anio, empleado, horario, tipoJornada ) => {
    return new Promise((resolve, reject) => {
        // Agrego cabecera para autorizacón de conexión mediante token jwt
        const headers = {'autorization': token()}
        axios.post('http://localhost:5000/api/turnos', 
            {
                dia: dia,
                mes: mes,
                anio: anio,
                empleado: empleado,
                horario: horario,
                tipoJornada: tipoJornada,
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

// Busco los turnos en la api
export const getTurnosApi = () => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.get('http://localhost:5000/api/turnos', { headers })
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject( error );
        });
    });
}

// Busco los turnos por año y mes
export const getTurnosPorMesApi = (anio, mes) => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.get(`http://localhost:5000/api/turnosByMes/${ anio }/${ mes }`, { headers })
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}

// Busco los turnos que son de un tipo de jornada
export const getTurnosApiByTipo = ( tipo ) => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.get(`http://localhost:5000/api/turnosByTipo/${ tipo }`, { headers })
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}

// Borro un turno por id
export const borrarTurnosApi = ( id ) => {
    return new Promise((resolve, reject) => {
        const headers = {'autorization': token()}
        axios.delete(`http://localhost:5000/api/turnos/${id}`, { headers })
        .then( response => {
            return resolve(response);
        }).catch( error => {
            return reject(error);
        });
    });
}