import React, { useEffect } from "react";
import { connect } from "react-redux";
import DiaCalendario from "./DiaCalendario.component";
import styled from "../../../node_modules/styled-components";
import { getTurnosPorMes } from "../../redux/root-actions";

const CalendarioSinEstilo = ({ className, getTurnosPorMes, coleccionTurnos }) => {

    // Seteo el año y el mes manualmente, pero hay que hacerlo con algún calendario para poder elejir el mes.
    let nroAnio = 2021;
    let nroMes = 10;

    const numeroDiasMes = new Date(nroAnio, nroMes, 0).getDate()

    //PARA FORZAR LA CARGA DE LOS EMPLEADOS AL INICIALIZAR
    useEffect(() => {
        getTurnosPorMes(nroAnio, nroMes);
    }, [ getTurnosPorMes ]);

    const arrayDias = [];
    for(let i = 1; i <= numeroDiasMes; i++){
        let diaSemana = new Date(nroAnio, nroMes-1, i).getDay();
        let nroDia = i;
        let turnosDia = coleccionTurnos.filter(turno => turno.dia == i);

        console.log("turnosDia: " + turnosDia);

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

export default connect( mapStateToProps, { getTurnosPorMes } )( Calendario );