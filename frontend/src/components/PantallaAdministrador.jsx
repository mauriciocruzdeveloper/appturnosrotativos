import React from "react";
// Módulo para conectar con redux
import { connect } from "react-redux";
// Actions
import { logout } from "../redux/root-actions";
// Historial
import history from "../history";

// A esta pantalla sólo accede el administrador.
const PantallaAdministrador = ({ logout }) => {
    return (
        <div className="bg-light">

            <div className="bg-warning mb-2  text-center ">
                <span className="display-4 text-dark">ADMINS</span>  	
            </div>

            <div className="card d-grid gap-2 col-10 mx-auto bg-warning" >
            <div className="card-body " style={{width: '20rem'}, {height: '11rem'}}>
                <h5 className="card-title mt-1">LISTA DE EMPLEADOS</h5>
                <p className="card-text">Aqui podras dar de alta los empleados</p>
                <a href="#" className="btn btn-dark " onClick = {() => history.push("/empleados") }>Acceder</a>
            </div>
            </div>

            <div className="card d-grid gap-2 col-10 mx-auto bg-warning mt-2" >
            <div className="card-body " style={{width: '20rem'}, {height: '11rem'}}>
                <h5 className="card-title mt-1">TIPOS DE JORNADA</h5>
                <p className="card-text">Aqui podés dar de alta los tipos de jornada</p>
                <a href="#" className="btn btn-dark " onClick = {() => history.push("/tiposjornada") }>Acceder</a>
            </div>
            </div>

            <div className="card d-grid gap-2 col-10 mx-auto bg-warning mt-2" >
            <div className="card-body " style={{width: '20rem'}, {height: '11rem'}}>
                <h5 className="card-title mt-1">RESUMEN MENSUAL</h5>
                <p className="card-text">Visualizar lista de empleados, hs trabajadas, turnos extras del mes</p>
                <a href="#" className="btn btn-dark " onClick = {() => history.push("/resumen") }>Acceder</a>
            </div>
            </div>

        </div>
    )
};

export default connect( null, { logout } )( PantallaAdministrador );