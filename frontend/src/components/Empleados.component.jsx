import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../history";
import { 
  getEmpleados, 
  borrarEmpleado, 
  cargaFormAlta,
  cargaFormModifica,
} from "../redux/root-actions";

const Empleados = ({ 
  getEmpleados, 
  coleccionEmpleados, 
  borrarEmpleado, 
  cargaFormAlta,
  cargaFormModifica,
  isFetching }) => {

  //PARA FORZAR LA CARGA DE LOS EMPLEADOS AL INICIALIZAR
  useEffect(() => {
      const error = getEmpleados();
      console.log("Error en useEffect: " + JSON.stringify(error));
      console.log("length: " + Object.keys(error).length);
      // Acá no hice una promesa como hice con login porque la redireccón es sólo en caso de error.
      // Además así es más simple.
      if (Object.keys(error).length != 0){ history.push('/noautorizado')};
  }, [ getEmpleados ]);

  const handleEliminar = async (id) => {
    await borrarEmpleado( id );
    getEmpleados();
  }

  const handleModificar = (email) => {
    const empleado = coleccionEmpleados.find(empleado => empleado.email == email);
    console.log("email: " + empleado);
    cargaFormModifica( empleado );
    history.push("/empleados/carga");
  }

  const handleAlta = () => {
    cargaFormAlta();
    history.push("/empleados/carga")
  }

  return (
    isFetching ? <h3>cargando ....</h3> :

    <div className="bg-warning">
	    <div>
    	  <h3 className="display-4 text-center text-dark">EMPLEADOS</h3>    	                              
      </div>	   	

      <ol className="list-group list-group-numbered">

      {Object.values( coleccionEmpleados ).map(( { nombre, _id, email, admin }, i ) => (
        <li value={ _id } key={ i } className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{ nombre }</div>
              <div className="fw-bold">{ email }</div>
              <div className="fw-bold">Admin { admin?"SI":"NO" }</div>
            </div>
            <button onClick={() => handleEliminar(_id) } type="button" className="btn btn-outline-warning">Eliminar</button>
            <button onClick={() => handleModificar(email) } type="button" className="btn btn-dark">Modificar</button>
        </li>
      ))}
 
      </ol>

		  <div className="d-grid gap-2 col-5 mx-auto">
		    <button onClick={ handleAlta } type="button" className="btn btn-dark me-md-2  mt-4">ALTA EMPLEADO</button>
		  </div> 
      <div className="d-grid gap-2 col-5 mx-auto">
		    <button onClick={() => history.push("/")} type="button" className="btn btn-dark me-md-2  mt-4">PRINCIPAL</button>
		  </div> 
</div>

  );
};

const mapStateToProps = (state) => ({
  coleccionEmpleados: state.empleados.coleccionEmpleados,
  isFetching: state.empleados.isFetching,
});

export default connect( mapStateToProps, { getEmpleados, borrarEmpleado, cargaFormAlta, cargaFormModifica } )( Empleados );