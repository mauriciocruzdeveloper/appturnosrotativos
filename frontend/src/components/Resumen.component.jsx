import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getEmpleados, getTurnosPorMes } from "../redux/root-actions";
import history from "../history";
import ElementoResumen  from "./Elemento.Resumen.component";

const Resumen = ({ className, getTurnosPorMes, coleccionTurnos, getEmpleados, coleccionEmpleados, isFetching }) => {

    // Seteo el año y el mes manualmente, pero hay que hacerlo con algún calendario para poder elejir el mes.
    let nroAnio = 2021;
    let nroMes = 10;

    //PARA FORZAR LA CARGA AL INICIALIZAR. Lo hago para tener actualizados los turnos y empleados
    useEffect( async () => {
        await getTurnosPorMes(nroAnio, nroMes);
        await getEmpleados();
    }, [ getEmpleados ]);


    // Esto se puede mejorar. Me faltó un poco de tiempo para pulir detalles y reacer cosas.
    //Esto de abajo es para calcular las horas totales del mes por cada tipo de jornada y cada empleado.
    let sumatoriaTurnoNormal = {};
    let sumatoriaTurnoExtra = {};
    let sumatoriaDiaLibre = {};
    let sumatoriaVacaciones = {};
    let sumatoriaCumpleanios = {};
    coleccionEmpleados.forEach(empleado => {
        sumatoriaTurnoNormal[empleado.email] = coleccionTurnos.filter(turno => (turno.tipoJornada == "Turno Normal")).filter(turno => (turno.empleado == empleado.email)).length * 8;
        sumatoriaTurnoExtra[empleado.email] = coleccionTurnos.filter(turno => (turno.tipoJornada == "Turno Extra")).filter(turno => (turno.empleado == empleado.email)).length * 8;
        sumatoriaDiaLibre[empleado.email] = coleccionTurnos.filter(turno => (turno.tipoJornada == "Día Libre")).filter(turno => (turno.empleado == empleado.email)).length * 8;
        sumatoriaVacaciones[empleado.email] = coleccionTurnos.filter(turno => (turno.tipoJornada == "Vacaciones")).filter(turno => (turno.empleado == empleado.email)).length * 8;
        sumatoriaCumpleanios[empleado.email] = coleccionTurnos.filter(turno => (turno.tipoJornada == "Cumpleaños")).filter(turno => (turno.empleado == empleado.email)).length * 8;
    });
                
    return(
        // Si está leyendo los empleados de la base de datos, muestra ...cargando.
        isFetching ? <h3>cargando ....</h3> :

        <div class="bg-warning">
      
            <h3 class="display-4 text-center text-dark">EMPLEADOS</h3>    	                              
   	
            
            {
                coleccionEmpleados.map(( { nombre, email } ) => (
                    <ElementoResumen 
                        sumaTurnoNormal={sumatoriaTurnoNormal[email ]} 
                        sumaTurnoExtra={sumatoriaTurnoExtra[email]}
                        sumaDiaLibre={sumatoriaDiaLibre[email]}
                        sumaVacaciones={sumatoriaVacaciones[email]}
                        sumaCumpleanios={sumatoriaCumpleanios[email]}
                        email={email}
                        nombre={nombre}
                        />
                    )
                )
            }
                    
                      

         
          

            <div class="d-grid gap-2 col-5 mx-auto">
                <button onClick={() => history.push("/")} type="button" class="btn btn-dark me-md-2  mt-4">PRINCIPAL</button>
            </div> 
         
        </div>


    );
    
}


const mapStateToProps = (state) => ({
    coleccionTurnos: state.turnos.coleccionTurnos,
    coleccionEmpleados: state.empleados.coleccionEmpleados,
    isFetching: state.empleados.isFetching
  });

export default connect( mapStateToProps, { getTurnosPorMes, getEmpleados } )( Resumen );