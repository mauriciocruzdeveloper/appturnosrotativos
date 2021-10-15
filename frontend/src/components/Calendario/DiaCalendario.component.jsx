import React from "react";
import { connect } from "react-redux";
import styled from "../../../node_modules/styled-components";
import history from "../../history";

import { cargaFormTurnos, getTiposJornada } from '../../redux/root-actions';

// Este componente es el día en la grilla (Calendario)
const DiaCalendarioSinEstilo = ({ 
    className, 
    nroDia, 
    nroMes, 
    nroAnio, 
    diaSemana, 
    emailUsuario, 
    cargaFormTurnos,
    turnosDia,
    coleccionEmpleados }) => {

    // Los días y meses están representados con números en las variables, por eso creé estos arrays, para que me devuelvan el nombre según el número.
    const nombresDias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const handleAlta = async () => {
        cargaFormTurnos( emailUsuario, nroDia, nroMes, nroAnio );
        history.push("/turnos");
    }

    return(
        <div onClick={ handleAlta }  className= { className }>
            <Cabecera className>
                Día: {nombresDias[diaSemana]} {nroDia} de {nombreMeses[nroMes-1]} de {nroAnio}
            </Cabecera>
            <div>
                <CabeceraManiana>Mañana</CabeceraManiana>
                { turnosDia.filter(turno => turno.horario == "Mañana").map( 
                    // Para cada turno hago un div con el nombre del empleado y el horario del turno
                    turnoManiana => <div>{ coleccionEmpleados.find(e => e.email == turnoManiana.empleado).nombre } - {turnoManiana.tipoJornada}</div>
                ) } 
            </div>
            <div>
                <CabeceraTarde>Tarde</CabeceraTarde>
                { turnosDia.filter(turno => turno.horario == "Tarde").map( 
                    turnoTarde => <div>{coleccionEmpleados.find(e => e.email == turnoTarde.empleado).nombre} - {turnoTarde.tipoJornada}</div>
                ) } 
            </div>
            <div>
                <CabeceraNoche>Noche</CabeceraNoche>
                { turnosDia.filter(turno => turno.horario == "Noche").map( 
                    turnoNoche => <div>{coleccionEmpleados.find(e => e.email == turnoNoche.empleado).nombre} - {turnoNoche.tipoJornada}</div>
                ) } 
            </div>
        </div>
    );
}

const Cabecera = styled.div`
    background-color: #E5E5E5;
`;

const CabeceraManiana = styled.div`
    background-color: #FEF5E7;
`;

const CabeceraTarde = styled.div`
    background-color: #AED6F1;
`;

const CabeceraNoche = styled.div`
    background-color: #D0ECE7;
`;

const DiaCalendario = styled(DiaCalendarioSinEstilo)`

    .cabecera: #E5E5E5,

    box-sizing: border-box;
    margin:5px;
    border-color: #92e23b;
    border: 1px solid #000;

    text-align: center;
    justify-content: center;
    flex-direction: column;

    //CUANDO EL CURSOR PASA POR ARRIBA CAMBIA EL COLOR DEL BOTÓN
    &:active{
    background-color: #E5E5E5;
    }

    //AL PASAR EL CURSOR POR ARRIBA SE TRANSFORMA EN UNA MANITO
    &:hover{
    cursor: pointer;
    }

    //ESTO DE ABAJO ES PARA QUE NO SE PUEDA SELECCIONAR EL TEXTO DEL BOTÓN, SEGÚN EL NAVEGADOR
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */

`;

const mapStateToProps = (state) => ({
    emailUsuario: state.login.usuario.email,
    coleccionEmpleados: state.empleados.coleccionEmpleados
  });

export default connect( mapStateToProps, { cargaFormTurnos, getTiposJornada } )( DiaCalendario );