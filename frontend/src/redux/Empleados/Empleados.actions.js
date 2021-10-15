import { EmpleadosTypes } from "./Empleados.types";
import { 
    altaEmpleadoApi, 
    getEmpleadosApi, 
    borrarEmpleadoApi, 
    modificarEmpleadoApiByEmail
} from "./Empleados.utils";

// El dispatch es un parámetro que pasa a la función callback desde thunk. Es propio de redux thunk.
export const agregarEmpleado = ( nombre, email, password, admin, modifica ) => async ( dispatch ) => {

    dispatch( isFetchingStart() );
    // "modifica" es un estado que lo utilizo para saber si al agregarEmpleado tengo que dar de alta o modificar,
    // según si se partió desde la selección de un empleado existente o de uno nuevo.
    if(modifica){
        return await modificarEmpleadoApiByEmail( nombre, email, password, admin )
            // Envío el response del error porque de ahí saco el status y sé qué tipo de error es
            .catch( error => error.response )
            .finally(dispatch( isFetchingCoplete()));
    }else{
        // La contraseña se encripta del lado del servidor por seguridad
        return await altaEmpleadoApi( nombre, email, password, admin )
            .catch( error => error.response )
            .finally(dispatch( isFetchingCoplete() ));
    };
};

export const getEmpleados = () => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    return await getEmpleadosApi()
        .then(( response ) => {
            dispatch( getEmpleadosComplete(response.data));
            return response;
        }).catch(( error ) => {
            dispatch( isFetchingCoplete() );
            return error.response;
        });
};

export const borrarEmpleado = ( id ) => async ( dispatch ) => {
    dispatch( isFetchingStart() );

    return await borrarEmpleadoApi(id)
        .catch( error => error.response )
        .finally(dispatch( isFetchingCoplete() ));
};

// isFetchingStart e isFetchingComplete son acciones para modificar el estado que indica si la app se está conectando.
export const isFetchingStart = () => ({ type: EmpleadosTypes.ISFETCHING_START });
export const isFetchingCoplete = () => ({ type: EmpleadosTypes.ISFETCHING_COMPLETE });

export const getEmpleadosComplete = ( data ) => ({ 
    type: EmpleadosTypes.GET_EMPLEADOS_COMPLETE, 
    payload: { data }
});

export const nombreOnChange = ( data ) => ({ 
    type: EmpleadosTypes.CHANGE_NOMBRE,
    payload: { data }
});

export const emailOnChange = ( data ) => ({ 
    type: EmpleadosTypes.CHANGE_EMAIL,
    payload: { data }
});

export const passwordOnChange = ( data ) => ({ 
    type: EmpleadosTypes.CHANGE_PASSWORD,
    payload: { data }
});

export const adminOnChange = ( data ) => ({ 
    type: EmpleadosTypes.CHANGE_ADMIN,
    payload: { data }
});

export const cargaFormAlta = () => {
    return {
    type: EmpleadosTypes.CARGA_FORM_ALTA
}};

export const cargaFormModifica = ( empleado ) => {
    return {
    type: EmpleadosTypes.CARGA_FORM_MODIFICA, 
    payload: { empleado }
}};


