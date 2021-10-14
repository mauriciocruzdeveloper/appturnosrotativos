import { TiposJornadaTypes } from "./TipoJornada.types";

const INITIAL_STATE = {
    isFetching: false,
    form:{
        tipo: ''
    },
    coleccionTiposJornada: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TiposJornadaTypes.ISFETCHING_START:
            return { ...state, isFetching: true };

        case TiposJornadaTypes.ISFETCHING_COMPLETE:
            return { ...state, isFetching: true };
    
        case TiposJornadaTypes.GET_TIPOSJORNADA_COMPLETE:
            return { ...state, isFetching: false, coleccionTiposJornada: action.payload.data };

        case TiposJornadaTypes.CHANGE_TIPO:
            console.log(action.payload);
            return { 
                ...state, 
                form: {
                    ...state.form,
                    tipo: action.payload.data
                }
             };

        case TiposJornadaTypes.CARGA_FORM_ALTA:
            return {
                ...state,
                form: {
                    ...state.form,
                    tipo: ''
                }
            };

        default:
            return state;
    }
}

