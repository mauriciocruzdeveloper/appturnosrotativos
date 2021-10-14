import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../history";
import { 
  getTiposJornada, 
  borrarTipoJornada, 
  cargaFormTipoJornada,
} from "../redux/root-actions";

const TiposJornada = ({ 
    getTiposJornada, 
    coleccionTiposJornada, 
    borrarTipoJornada, 
    cargaFormTipoJornada,
    isFetching }) => {

  //PARA FORZAR LA CARGA DE LOS EMPLEADOS AL INICIALIZAR
  useEffect(() => {
    getTiposJornada();
  }, [getTiposJornada]);

  const handleEliminar = ( id ) => {
    borrarTipoJornada( id );
    getTiposJornada();
  }

  const handleAlta = () => {
    cargaFormTipoJornada();
    history.push("/tiposjornada/carga")
  }

 

  return (
    // Si se está conectando a la base de datos, muestra cargando...
    isFetching ? <h3>cargando ....</h3> :
    <body class="bg-warning">
      <div>
          <h3 class="display-4 text-center text-dark">JORNADA LABORAL</h3>    	                              
      </div>		

      <ol class="list-group list-group-numbered">

          {Object.values( coleccionTiposJornada ).map(( { tipo, _id }, i ) => (
              <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">
                { tipo }
                </div>       
              </div>
              <button onClick={() => handleEliminar( _id ) }  type="button" class="btn btn-outline-warning">BAJA</button>
            </li>
          ))}
    </ol>

    <div class="d-grid gap-2 col-5 mx-auto">
      <button onClick={ handleAlta } type="button" class="btn btn-dark me-md-2  mt-4">ALTA JORNADA</button>
    </div>

    <div class="d-grid gap-2 col-5 mx-auto">
      <button  onClick={() => history.push("/")} type="button" class="btn btn-dark me-md-2  mt-4">NAVEGAR A PRINCIPAL</button>
    </div>
    
  </body>
  );
};

const mapStateToProps = (state) => ({
  coleccionTiposJornada: state.tiposJornada.coleccionTiposJornada,
  isFetching: state.tiposJornada.isFetching
});

export default connect( mapStateToProps, { getTiposJornada, borrarTipoJornada, cargaFormTipoJornada } )( TiposJornada );