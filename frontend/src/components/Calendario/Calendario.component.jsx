import React, { useEffect } from "react";
import { connect } from "react-redux";
import DiaCalendario from "./DiaCalendario.component";
import styled from "../../../node_modules/styled-components";
import { getTurnosPorMes, getEmpleados } from "../../redux/root-actions";
import history from "../../history";

const CalendarioSinEstilo = ({ className, getTurnosPorMes, getEmpleados, coleccionTurnos }) => {

    // Seteo el año y el mes manualmente, pero hay que hacerlo con algún calendario para poder elejir el mes.
    let nroAnio = 2021;
    let nroMes = 10;

    const numeroDiasMes = new Date(nroAnio, nroMes, 0).getDate()

    //PARA FORZAR LA CARGA DE LOS EMPLEADOS AL INICIALIZAR
    useEffect( async () => {
        await getTurnosPorMes(nroAnio, nroMes);
        // Cargo la colección de empleados para luego tomar el nombre según el email que tengo en el turno
        const response = await getEmpleados();
        // Acá no hice una promesa como hice con login porque la redireccón es sólo en caso de error.
        // Además así es más simple. Si el status es 401 es NO AUTORIZADO.
        if (response?.status == 401){ return history.push('/noautorizado')};
        if (response?.status == 400){ return history.push('/ocurrioproblema')};
    }, [ getTurnosPorMes ]);

    const arrayDias = [];
    for(let i = 1; i <= numeroDiasMes; i++){
        let diaSemana = new Date(nroAnio, nroMes-1, i).getDay();
        let nroDia = i;
        // Los turnos del día que luego voy a pushear
        let turnosDia = coleccionTurnos.filter(turno => turno.dia == i);
        arrayDias.push({nroDia, nroMes, nroAnio, diaSemana, turnosDia});
    };
                
    return(
        <div className = { className } >
            { 
                 arrayDias.map( 
                    ({ nroDia, nroMes, nroAnio, diaSemana, turnosDia }) => 
                    <DiaCalendario 
                        className='' 
                        key={ nroDia }
                        nroDia={ nroDia }
                        nroMes={ nroMes }
                        nroAnio={ nroAnio }
                        diaSemana={ diaSemana }
                        turnosDia= { turnosDia }
                    />
                )
            }
        </div>
    );
}

const Calendario = styled( CalendarioSinEstilo )`
    display: block
    margin: 0 auto;
    padding: 20px;
    background-color: #FFC107;
    width: 80%;
`;

const mapStateToProps = (state) => ({
    coleccionTurnos: state.turnos.coleccionTurnos,
  });

export default connect( mapStateToProps, { getTurnosPorMes, getEmpleados } )( Calendario );