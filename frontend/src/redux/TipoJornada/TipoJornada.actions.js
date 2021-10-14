import { TiposJornadaTypes } from "./TipoJornada.types";
import { 
    altaTipoJornadaApi, 
    getTiposJornadaApi, 
    borrarTipoJornadaApi
} from "./TipoJornada.utils";


//Estas funciones no están vinculadas directamente con el reducer, sino que dispachan otras que sí están vinculadas al reducer.

// El dispatch es un parámetro que pasa a la función callback desde thunk. Es propio de redux thunk.
export const agregarTipoJornada = ( tipo ) => ( dispatch ) => {
    dispatch( isFetchingStart() );
    altaTipoJornadaApi( tipo )
        .catch(( error ) => console.log(error))
        .finally(dispatch( isFetchingCoplete() ));
};

export const getTiposJornada = () => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    await getTiposJornadaApi()
        .then(( data ) => {
            // Los datos vienen del backend com oun arreglo, pero los necesito como objetos,
            // para eso hago lo de abajo, transformo un array en un objeto.
            //const datanew = data.reduce((a, tipoJornada) => ({ ...a, [tipoJornada.tipo]: tipoJornada}), {});
            dispatch( getTiposJornadaComplete(data));
        }).catch(( error ) => {
            console.log(error);
            dispatch( isFetchingCoplete() );
        });
};

export const borrarTipoJornada = ( id ) => ( dispatch ) => {
    dispatch( isFetchingStart() );
    borrarTipoJornadaApi( id )
        .catch(( error ) => console.log(error))
        .finally(dispatch( isFetchingCoplete() ));
};

// Acciones vinculadas directamente al reducer
export const isFetchingStart = () => ({ type: TiposJornadaTypes.ISFETCHING_START });
export const isFetchingCoplete = () => ({ type: TiposJornadaTypes.ISFETCHING_COMPLETE });

export const getTiposJornadaComplete = ( data ) => ({ 
    type: TiposJornadaTypes.GET_TIPOSJORNADA_COMPLETE, 
    payload: { data }
});

export const tipoOnChange = ( data ) => ({ 
    type: TiposJornadaTypes.CHANGE_TIPO,
    payload: { data }
});

export const cargaFormTipoJornada = () => {
    return {
    type: TiposJornadaTypes.CARGA_FORM_ALTA
}};