import { LoginTypes } from "./Login.types";

const INITIAL_STATE = {
    isLoggedIn: false,
    isFetching: false,
    usuario:{
        nombre: '',
        email: '',
        password: '',
        admin: false,
        token: ''
    },
}

// Reducer para el Login
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoginTypes.ISFETCHING_LOGIN_START:
            return { ...state, isFetching: true };

        case LoginTypes.ISFETCHING_LOGIN_COMPLETE:
            return { ...state, isFetching: false };

        case LoginTypes.LOGIN:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: action.payload.data.isLoggedIn,
                usuario: {
                    ...state.usuario,
                    nombre: action.payload.data.empleado.nombre,
                    admin: action.payload.data.empleado.admin,
                    email: action.payload.data.empleado.email,
                    password: action.payload.data.empleado.password,
                    token: action.payload.data.empleado.token
                }
            }
        case LoginTypes.LOGOUT:
            return {
                ...state, 
                isLoggedIn: action.payload.data.isLoggedIn
            }
        case LoginTypes.CHANGE_PASSWORD_LOGIN:
            return { 
                ...state, 
                usuario: {
                    ...state.usuario,
                    password: action.payload.data
                }
            };
        case LoginTypes.CHANGE_EMAIL_LOGIN:
            return { 
                ...state, 
                usuario: {
                    ...state.usuario,
                    email: action.payload.data
                }
            };
        default:
            return state;
    }
}

