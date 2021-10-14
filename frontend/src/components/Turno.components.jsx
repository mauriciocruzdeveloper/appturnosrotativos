import React, {useEffect} from "react";
import { connect } from "react-redux";
import history from "../history";
import { agregarTurnos, tipoTurnoOnChange, horarioOnChange, getTiposJornada } from "../redux/root-actions";
import { verificaPosibilidadTurno } from "../redux/Turnos/Turnos.actions";


const Turno = ({ 
    dia,
    mes, 
    anio, 
    empleado, 
    coleccionTiposJornada,
    horario,
    tipoJornada,
    tipoTurnoOnChange,
    horarioOnChange,
    agregarTurnos,
    getTiposJornada,
    turnoPermitido,
    mensajePermitido,
    verificaPosibilidadTurno }) => {

    const horarios = ["Mañana","Tarde","Noche"];

    useEffect(async () => {
        await getTiposJornada();
        await verificaPosibilidadTurno( empleado, horario, tipoJornada, dia, mes, anio );
    }, [ getTiposJornada ]);

    const handleGuardar = async () => {
        await agregarTurnos( dia, mes, anio, empleado, horario, tipoJornada);
        history.goBack();        
    }

    const handleChangeHorario = async (e) => {
        horarioOnChange( e.target.value );
        console.log ( empleado, e.target.value, tipoJornada, dia, mes, anio );
        await verificaPosibilidadTurno( empleado, e.target.value, tipoJornada, dia, mes, anio );
    };

    const handleChangeTipo = async (e) => {
        tipoTurnoOnChange( e.target.value )
        await verificaPosibilidadTurno( empleado, e.target.value, e.target.value, dia, mes, anio );
    };

    // En futuras versiones de la app se va a mejorar la estética. Hay varios aspectos que no están del todo terminados.
    return(
        <div>
            <div className="m-0 row justify-content-center">
                <h1 className="col-auto bg-light p-5 text-center">Alta de Jornada</h1>
            </div>
            <div>Fecha: {dia}/{mes}/{anio}</div><br />
            <div>Empleado: {empleado}</div><br />

            <select onChange={ handleChangeTipo }>
                <option name="SelectTipo" key="SelecTipo" defaultValue>Tipo de Jornada</option>
                { coleccionTiposJornada.map(({ tipo }) => 
                    <option name={tipo} key={tipo} value={tipo} {...(tipo == tipoJornada)? "selected" : null}>
                    {tipo}
                    </option>) }
            </select>
            <br />
            <br />
            <select onChange={ handleChangeHorario }>
                <option name="SelectHora" key="SelecHora" defaultValue>Horario</option>
                { horarios.map( hora => 
                    <option name={hora} key={hora} value={hora} {...(hora == horario)? "selected" : null}>
                    {hora}
                    </option>) }
            </select>
            <br />
            <br />

                {!turnoPermitido ? 
                //Si el turno que está seleccionando no se puede otorgar, muestra el mensaje correspondiente y no deja guardar
                    <div><h1>TURNO NO PERMITIDO</h1><h2>{mensajePermitido}</h2></div> 
                    : null }

                <div className="row justify-content-end">
                    {turnoPermitido ? 
                        <button type="button" className="border col-2 btn btn-primary float-left" onClick={ handleGuardar }>Guardar</button>
                        : null}
                    <button type="button" className="border col-2 btn btn-primary float-right" onClick={ () => history.goBack() }>Cerrar</button>
                </div> 

            <div className="row justify-content-end">
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dia: state.turnos.form.dia,
    mes: state.turnos.form.mes,
    anio: state.turnos.form.anio,
    empleado: state.turnos.form.empleado,
    horario: state.turnos.form.horario,
    tipoJornada: state.turnos.form.tipoJornada,
    coleccionTiposJornada: state.tiposJornada.coleccionTiposJornada,
    turnoPermitido: state.turnos.permitido, //true es permitido, false es no permitido
    mensajePermitido: state.turnos.motivoPermitido
  });

export default connect( mapStateToProps, { tipoTurnoOnChange, horarioOnChange, agregarTurnos, getTiposJornada, verificaPosibilidadTurno } )( Turno );