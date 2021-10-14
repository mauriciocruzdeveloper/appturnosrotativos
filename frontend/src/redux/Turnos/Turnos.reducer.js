import { TurnosTypes } from "./Turnos.types";

const INITIAL_STATE = {
    isFetching: false,
    permitido: true,
    mensaje: '',
    form:{
        // La fecha la guardo así porque se me va a simplificar luego
        dia: '',
        mes: '',
        anio: '',
        // El email del empleado, que es el identificador para mí, mongoDB usa otro.
        empleado: '',
        //// Tipos de Jornada //// Se pueden agregar o quitar, pero van a estar estas:
        // Turno Normal
        // Turno Extra
        // Vacaciones
        // Día Libre
        // Cumpleaños
        tipoJornada: '',
        //// Horarios ////
        // de 6 a 14, horario MAÑANA
        // de 14 a 22, horario TARDE
        // de 22 a 6, horario NOCHE
        horario: ''

    },
    coleccionTurnos: []
};

// Hay 1 reducer por entidad y el login. Luego se convinan en el archivo root-reducer.

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TurnosTypes.TURNO_PERMITIDO:
            console.log(action.payload.permitido);
            return { 
                ...state, 
                permitido: action.payload.data.permitido,
                motivoPermitido: action.payload.data.motivo
            };

        case TurnosTypes.ISFETCHING_START:
            return { ...state, isFetching: true };

        case TurnosTypes.ISFETCHING_COMPLETE:
            return { ...state, isFetching: true };
    
        case TurnosTypes.GET_TURNOS_COMPLETE:
            return { ...state, isFetching: false, coleccionTurnos: action.payload.data };

        case TurnosTypes.CHANGE_TIPO:
            return { 
                ...state, 
                form: {
                    ...state.form,
                    tipoJornada: action.payload.data
                }
            };

        case TurnosTypes.CHANGE_HORARIO:
            return { 
                ...state, 
                form: {
                    ...state.form,
                    horario: action.payload.data
                }
            };

        case TurnosTypes.CARGA_FORM_TURNOS:
            return {
                ...state,
                form: {
                    ...state.form,
                    dia: action.payload.fecha.dia,
                    mes: action.payload.fecha.mes,
                    anio: action.payload.fecha.anio,
                    empleado: action.payload.empleado,
                    tipoJornada: '',
                    horario: ''
                }
            };

        default:
            return state;
    }
}

