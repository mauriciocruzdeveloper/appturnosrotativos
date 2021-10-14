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

    console.log("entra al action");

    console.log ( email, horario, tipoJornada, dia, mes, anio );
    
    // Indico que estoy haciendo fetch
    dispatch( isFetchingStart() );
    // Busco los turnos del mes
    await getTurnosPorMesApi( anio, mes )
        .then(data => turnosDelMes = data)
        .catch((error) => {
            console.log(error);

            console.log("entra al catch de getTurnosPorMesApi en verificaPosibilidadTurno");

            dispatch( isFetchingCoplete() 
        )});

    console.log("turnosDelMes" + turnosDelMes);


    //No se puede turno extra con extra en día anterior.

    let turnoDelEmpleado = turnosDelMes.filter( turno => (turno.empleado == email));
    turnoDelEmpleado = turnoDelEmpleado.filter( turno => (turno.dia == dia-1));
    turnoDelEmpleado = turnoDelEmpleado.filter( turno => (turno.tipoJornada == "Turno Extra"));
    if((turnoDelEmpleado.length > 0) && (tipoJornada == "Turno Extra")){ 
        return dispatch( turnoPermitido(false, "Ya hizo un Turno Extra el día de ayer"));
    } else {
        dispatch( turnoPermitido(true));
    };


    //////////////////////////////////////////////////

    //No más de 1 turno normal por día. Si es normal, sólo extra.

    turnoDelEmpleado = turnosDelMes.filter( turno => (turno.empleado == email));
    turnoDelEmpleado = turnoDelEmpleado.filter( turno => (turno.dia == dia));

    console.log("tipoJornada: " + tipoJornada);
    console.log("tipoJornada: " + turnoDelEmpleado[0]?.tipoJornada);

    console.log(turnoDelEmpleado.length)

    if(turnoDelEmpleado.length > 0){
        console.log("tipoJornada: " + tipoJornada);
        console.log("tipoJornada: " + turnoDelEmpleado[0].tipoJornada);
        if((tipoJornada == "Turno Extra") && (turnoDelEmpleado[0].tipoJornada == "Turno Normal")){
            console.log("tipoJornada: " + tipoJornada);
            console.log("tipoJornada: " + turnoDelEmpleado[0].tipoJornada);
            dispatch( turnoPermitido(true));
        } else {
            console.log("ENTRA AL FASE");
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

    console.log("turnosDelMes despues dia libre" + turnosDelMes);

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

    console.log("turnoDiaAnterior " + turnoDiaAnterior);

    turnoDiaAnterior = turnoDiaAnterior.filter(turno => turno?.empleado == email);

    console.log("turnoDiaAnterior " + turnoDiaAnterior);

    console.log("Horario: " + horario);
    console.log("Horario anterior: " + turnoDiaAnterior[0]?.horario);

    switch (horario) {
        case "Mañana":
            console.log("Entra a mañana");
            if( turnoDiaAnterior[0]?.horario == "Tarde" || turnoDiaAnterior[0]?.horario == "Noche"){

                if( turnoDiaAnterior[0]?.tipoJornada == "Día Libre" ){
                    console.log("SALE POR 24 MAÑANA");
                    return dispatch( turnoPermitido( false, "24hs por día libre" ) );
                }else {
                    dispatch( turnoPermitido( true ) );
                };
            };
            break;
        case "Tarde":
            if( turnoDiaAnterior[0]?.horario == "Noche"){
                if( turnoDiaAnterior[0]?.tipoJornada == "Día Libre" ){
                    console.log("SALE POR 24 TARDE");
                    return dispatch( turnoPermitido( false, "24hs por día libre" ) );
                } else {
                    dispatch( turnoPermitido( true ) );
                };
            };
            break;
        case "Noche":
            if( turnoDiaAnterior[0]?.tipoJornada == "Día Libre" ){
                console.log("SALE POR 24 NOCHE");
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

    console.log("turno del empleado: " + turnoDelEmpleado);

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

        console.log("nro semana: " + nroSemanaEach, nroSemana);

        if(nroSemana == nroSemanaEach){
            horasSemana = 8 + horasSemana;
        }
    });

    console.log("horas semanalaes: " + horasSemana);

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

// El dispatch es un parámetro que pasa a la función callback desde thunk. Es propio de redux thunk.
export const agregarTurnos = ( dia, mes, anio, empleado, horario, tipoJornada ) => async ( dispatch ) => {
    dispatch( isFetchingStart() );
    await altaTurnosApi( dia, mes, anio, empleado, horario, tipoJornada )
        .catch(( error ) => console.log(error))
        .finally(dispatch( isFetchingCoplete() ));
};

export const getTurnos = () => ( dispatch ) => {
    dispatch( isFetchingStart() );
    getTurnosApi()
        .then(( data ) => {
            dispatch( getTurnosComplete(data));
        }).catch(( error ) => {
            console.log(error);
            dispatch( isFetchingCoplete() );
        });
};

// Genero un objeto en forma de arbol para buscar fácilmente por fecha
export const getTurnosPorMes = (anio, mes) => ( dispatch ) => {
    dispatch( isFetchingStart() );
    getTurnosPorMesApi(anio, mes)
        .then(( data ) => {
            dispatch( getTurnosComplete(data));
        }).catch(( error ) => {
            console.log(error);
            dispatch( isFetchingCoplete() );
        });
};

export const borrarTurnos = ( id ) => ( dispatch ) => {
    dispatch( isFetchingStart() );
    borrarTurnosApi( id )
        .catch(( error ) => console.log(error))
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
    console.log(emailUsuario);
    console.log(dia);
    console.log(mes);
    console.log(anio);
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