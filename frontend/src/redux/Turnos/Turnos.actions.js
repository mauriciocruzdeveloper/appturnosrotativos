import { TurnosTypes } from "./Turnos.types";
import { 
    altaTurnosApi, 
    getTurnosApi, 
    borrarTurnosApi,
    getTurnosPorMesApi
} from "./Turnos.utils";


// Hay funciones que terminan en dispatch y otras que no. Todas las acciones están en los archivos actions, luego pasan las acciones al reducer.

export const verificaPosibilidadTurno = ( email, horario, tipoJornada, dia, mes, anio ) => async (dispatch) => {
    let turnosDelMes = [];

    // Indico que estoy haciendo fetch
    dispatch( isFetchingStart() );
    // Busco los turnos del mes
    await getTurnosPorMesApi( anio, mes )
        .then(response => turnosDelMes = response.data)
        .catch((error) => {
            console.log(error);
            dispatch( isFetchingCoplete() 
        )});


    //No se puede turno extra con extra en día anterior.
    
    let turnoDelEmpleado = turnosDelMes.filter( turno => (turno.empleado == email));
    turnoDelEmpleado = turnoDelEmpleado.filter( turno => (turno.dia == dia-1));
    turnoDelEmpleado = turnoDelEmpleado.filter( turno => (turno.tipoJornada == "Turno Extra"));
    // Filtro los turnos del empleado del día anterior que hayan sido extras, si es más que 0 no puede hacer un extra hoy.
    if((turnoDelEmpleado.length > 0) && (tipoJornada == "Turno Extra")){ 
        return dispatch( turnoPermitido(false, "Ya hizo un Turno Extra el día de ayer"));
    } else {
        dispatch( turnoPermitido(true));
    };


    //////////////////////////////////////////////////

    //No más de 1 turno por día. Si es normal, sólo extra.

    turnoDelEmpleado = turnosDelMes.filter( turno => (turno.empleado == email));
    turnoDelEmpleado = turnoDelEmpleado.filter( turno => (turno.dia == dia));
    // Filtro los turnos normales de éste día, y no pueden ser más que 0
    if(turnoDelEmpleado.length > 0){
        if((tipoJornada == "Turno Extra") && (turnoDelEmpleado[0].tipoJornada == "Turno Normal")){
            dispatch( turnoPermitido(true));
        } else {
            return dispatch( turnoPermitido(false, "Más de un turno"));
        };
    } else {
        dispatch( turnoPermitido(true) );
    };

    //////////////////////////////////////////////////////////////
    
    // No más de 2 por turno, o sea, 2 por la mañana, 2 por la tarde y 2 por la noche
    let turnosDelMesSinLibres = turnosDelMes;
    
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.empleado == email))
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.tipoJornada != "Día Libre")); // Filtro los que no son Día Libre
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.tipoJornada != "Vacaciones")); // Filtro los que no son Vacaciones
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.tipoJornada != "Cumpeaños")); // Filtro los que no son Cumpleaños
    // Filtro los turnos del día que no sean vacaciones, ni día libre, ni cumpleaños y me fijo que no haya 2 turnos
    let turnosDelDia = [];
    turnosDelDia = turnosDelMes.filter(turno => (turno?.dia == dia));
    let turnosDelHorario = [];
    turnosDelHorario = turnosDelDia.filter(turno => (turno?.horario == horario));
    if(turnosDelHorario?.length > 1) {
        return dispatch( turnoPermitido(false, "Más de 2 empleados por turno"));
    } else {
        dispatch( turnoPermitido(true));
    };
    //////////////////////////

    // 24hs sin trabajar por día libre.
    let turnoDiaAnterior = turnosDelMes.filter(turno => turno?.dia == (dia-1));

    turnoDiaAnterior = turnoDiaAnterior.filter(turno => turno?.empleado == email);

    switch (horario) {
        case "Mañana":
            console.log("Entra a mañana");
            if( turnoDiaAnterior[0]?.horario == "Tarde" || turnoDiaAnterior[0]?.horario == "Noche"){
                if( turnoDiaAnterior[0]?.tipoJornada == "Día Libre" ){
                    return dispatch( turnoPermitido( false, "24hs por día libre" ) );
                }else {
                    dispatch( turnoPermitido( true ) );
                };
            };
            break;
        case "Tarde":
            if( turnoDiaAnterior[0]?.horario == "Noche"){
                if( turnoDiaAnterior[0]?.tipoJornada == "Día Libre" ){
                    return dispatch( turnoPermitido( false, "24hs por día libre" ) );
                } else {
                    dispatch( turnoPermitido( true ) );
                };
            };
            break;
        case "Noche":
            if( turnoDiaAnterior[0]?.tipoJornada == "Día Libre" ){
                return dispatch( turnoPermitido( false, "24hs por día libre" ) );
            } else {
                dispatch( turnoPermitido( true ) );
            };
        default:
            dispatch( turnoPermitido( true ));
    };
    //////////////////////////////////////


    // Mínimo 2 Días Libres al mes

    turnoDelEmpleado = turnosDelMes.filter(turno => turno?.empleado == email);
    turnoDelEmpleado = turnoDelEmpleado.filter(turno => turno?.tipoJornada != "Día Libre");
    turnoDelEmpleado = turnoDelEmpleado.filter(turno => turno?.tipoJornada != "Vacaciones");
    turnoDelEmpleado = turnoDelEmpleado.filter(turno => turno?.tipoJornada != "Cumpleaños");
    turnoDelEmpleado = turnoDelEmpleado.filter(turno => turno?.tipoJornada != "Turno Extra");

    const diasDelMes = new Date(anio, mes, 0).getDate();
    const diasOcupadosEmpleado = turnoDelEmpleado.length;
    if(( diasDelMes - diasOcupadosEmpleado) <= 2 ){
        if( tipoJornada == "Día Libre" ){
            dispatch( turnoPermitido( true ) );
        } else {
            dispatch( turnoPermitido( false, "Sólo puede seleccionar Día Libre" ) );
        }
    } else {
        dispatch( turnoPermitido( true ) );
    }

    /////////////////////////////


    //48hs Semanales/////

    //FUNCIÓN PARA OBTENER EL NÚMERO DE SEMANA
    function weekAndDay(date) {
        var prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
        return prefixes[Math.floor(date.getDate() / 7)];
    }

    let horasSemana = 0; // Es un array donde el índice es el número de la semana, y ahí voy sumarizando las horas. Cada turno son 8hs.
    const nroSemana = weekAndDay(new Date( anio, mes, dia ));
    turnosDelMesSinLibres = turnosDelMes.filter( turno => turno.empleado == email);
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.tipoJornada != "Día Libre")); // Filtro los que no son Día Libre
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.tipoJornada != "Vacaciones")); // Filtro los que no son Vacaciones
    turnosDelMesSinLibres = turnosDelMesSinLibres.filter(turno => (turno?.tipoJornada != "Cumpeaños")); // Filtro los que no son Cumpleaños
    turnosDelMesSinLibres.forEach(({ anio, mes, dia }) => {
        let nroSemanaEach = weekAndDay(new Date( anio, mes, dia ));
        if(nroSemana == nroSemanaEach){
            horasSemana = 8 + horasSemana;
        }
    });
    if( horasSemana >= 48 ) { return dispatch( turnoPermitido( false, "48hs semanales" ) ) };
   
    //////////////////////////////////////////

}

export const turnoPermitido = ( permitido, motivo ) => ({ 
    type: TurnosTypes.TURNO_PERMITIDO, 
    payload: { 
        data: {
            permitido: permitido,
            motivo: motivo
        }
    }
});

// EN LAS FUNCIONES DE ABAJO RESTORNO UN RESPONSE. LUEGO CON EL STATUS DE RESPONSE ME DOY CUENTA SI HUBO UN ERROR O NO

// El dispatch es un parámetro que pasa a la función callback desde thunk. Es propio de redux thunk.
export const agregarTurnos = ( dia, mes, anio, empleado, horario, tipoJornada ) => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    return await altaTurnosApi( dia, mes, anio, empleado, horario, tipoJornada )
        .catch( error => error.response)
        .finally(dispatch( isFetchingCoplete() ));
};

export const getTurnos = () => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    return await getTurnosApi()
        .then(( response ) => {
            dispatch( getTurnosComplete(response.data));
            return response;
        }).catch(( error ) => {
            dispatch( isFetchingCoplete());
            return error.response;
        });
};

// Busco los turnos por mes y año
export const getTurnosPorMes = ( anio, mes ) => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    return await getTurnosPorMesApi(anio, mes)
        .then(( response ) => {
            dispatch( getTurnosComplete( response.data ));
            return response;
        }).catch(( error ) => {
            dispatch( isFetchingCoplete() );
            return error.response;
        });
};

// Borro un turno
export const borrarTurnos = ( id ) => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    return await borrarTurnosApi( id )
        .catch(( error ) => error.response )
        .finally(dispatch( isFetchingCoplete() ));
};

// Acciones vinculadas directamente al reducer
export const isFetchingStart = () => ({ type: TurnosTypes.ISFETCHING_START });
export const isFetchingCoplete = () => ({ type: TurnosTypes.ISFETCHING_COMPLETE });

export const getTurnosComplete = ( data ) => ({ 
    type: TurnosTypes.GET_TURNOS_COMPLETE, 
    payload: { data }
});

export const tipoTurnoOnChange = ( data ) => ({ 
    type: TurnosTypes.CHANGE_TIPO,
    payload: { data }
});

export const horarioOnChange = ( data ) => ({ 
    type: TurnosTypes.CHANGE_HORARIO,
    payload: { data }
});

export const cargaFormTurnos = ( emailUsuario, dia, mes, anio ) => {
    return(
        {
            type: TurnosTypes.CARGA_FORM_TURNOS,
            payload: { 
                fecha : {dia:dia, mes:mes, anio:anio},
                empleado: emailUsuario
            }
        }
    )
};