import { EmpleadosTypes } from "./Empleados.types";

const INITIAL_STATE = {
    isFetching: false,
    form:{
        nombre: '',
        email: '',
        password: '',
        admin: false
    },
    coleccionEmpleados: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EmpleadosTypes.ISFETCHING_START:
            return { ...state, isFetching: true };

        case EmpleadosTypes.ISFETCHING_COMPLETE:
            return { ...state, isFetching: true };
    
        case EmpleadosTypes.GET_EMPLEADOS_COMPLETE:
            return { ...state, isFetching: false, coleccionEmpleados: action.payload.data };

        case EmpleadosTypes.CHANGE_NOMBRE:
            console.log(action.payload);
            return { 
                ...state, 
                form: {
                    ...state.form,
                    nombre: action.payload.data
                }
             };

        case EmpleadosTypes.CHANGE_EMAIL:
            return { 
                ...state, 
                form: {
                    ...state.form,
                    email: action.payload.data
                }
                };

        case EmpleadosTypes.CHANGE_PASSWORD:
            return { 
                ...state, 
                form: {
                    ...state.form,
                    password: action.payload.data
                }
            };

        case EmpleadosTypes.CHANGE_ADMIN:
            return { 
                ...state, 
                form: {
                    ...state.form,
                    admin: action.payload.data
                }
            };

        case EmpleadosTypes.CARGA_FORM_ALTA:
            return {
                ...state,
                form: {
                    ...state.form,
                    nombre: '',
                    email: '',
                    password: '',
                    admin: false,
                    modifica: false
                }
            };

        case EmpleadosTypes.CARGA_FORM_MODIFICA:
            return {
                ...state, 
                form: {
                    ...state.form,
                    nombre: action.payload.empleado.nombre,
                    email: action.payload.empleado.email,
                    password: action.payload.empleado.password,
                    admin: action.payload.empleado.admin,
                    modifica: true
                }
            };

        default:
            return state;
    }
}

