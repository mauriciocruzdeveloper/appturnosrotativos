import axios from 'axios';

// Estas son todas funciones de apoyo que llaman a la api del servidor.

export const altaEmpleadoApi = ( nombre, email, password, admin ) => {

    // La contraseña se encripta del lado del servidor por seguridad
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/api/empleados', {
            nombre: nombre,
            email: email,
            password: password,
            admin: admin
        }).then(response => {
            console.log(response.data);
            return resolve(response.data);
        }).catch(error => {
            return reject(error);
        });
    });
}

export const getEmpleadosApi = async () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/api/empleados')
        .then( response => {
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const getEmpleadosApiById = ( id ) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/api/empleados/${id}`)
        .then( response => {
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const getEmpleadosApiByEmail = ( email ) => {
    console.log("email: " + email);
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/api/empleadosByEmail/${email}`)
        .then( (response ) => {
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const borrarEmpleadoApi = ( id ) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:5000/api/empleados/${id}`)
        .then( response => {
            return resolve(response.data);
        }).catch( error => {
            return reject(error);
        });
    });
}

export const modificarEmpleadoApiByEmail = ( nombre, email, password, admin ) => {
    return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:5000/api/empleados/${email}`, {
            nombre: nombre,
            email: email,
            password: password,
            admin: admin
        }).then( response => {
            return resolve(response.data);
        }).catch( error => {
            console.log("errorrrr: " + error);
            return reject(error);
        });
    });
}

export const getLoginOkApi = ( email, password ) => {
    return new Promise((resolve, reject) => {
        console.log("email en login api: " + email);
        console.log("password en login api: " + password);
        // Se pasa por post en el body para que no se vea el usuario ni el password en la url
        axios.post('http://localhost:5000/api/empleados/login', {
            email: email,
            password: password
        }).then(response => {
            return resolve(response.data);
        }).catch(error => {
            console.log("Error en catch getLoginOkApi:" + error);
            return reject(error);
        });
    });
};