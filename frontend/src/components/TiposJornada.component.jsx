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
  useEffect(async () => {
    const response = await getTiposJornada();
    if (response?.status == 401){ return history.push('/noautorizado')};
    if (response?.status == 400){ return history.push('/ocurrioproblema')};
  }, [getTiposJornada]);

  const handleEliminar = async ( id ) => {
    const response = await borrarTipoJornada( id );
    if (response?.status == 401){ return history.push('/noautorizado')};
    if (response?.status == 400){ return history.push('/ocurrioproblema')};
    getTiposJornada();
  }

  const handleAlta = async () => {
    cargaFormTipoJornada();
    history.push("/tiposjornada/carga")
  }

 

  return (
    // Si se está conectando a la base de datos, muestra cargando...
    isFetching ? <h3>cargando ....</h3> :
    <div className="bg-warning">
      <div>
          <h3 className="display-4 text-center text-dark">JORNADA LABORAL</h3>    	                              
      </div>		

      <ol class="list-group list-group-numbered">

          {Object.values( coleccionTiposJornada ).map(( { tipo, _id }, i ) => (
              <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                { tipo }
                </div>       
              </div>
              <button onClick={() => handleEliminar( _id ) }  type="button" className="btn btn-outline-warning">BAJA</button>
            </li>
          ))}
      </ol>

      <div class="d-grid gap-2 col-5 mx-auto">
        <button onClick={ handleAlta } type="button" className="btn btn-dark me-md-2  mt-4">ALTA JORNADA</button>
      </div>

      <div class="d-grid gap-2 col-5 mx-auto">
        <button  onClick={() => history.push("/")} type="button" className="btn btn-dark me-md-2  mt-4">PRINCIPAL</button>
      </div>
    
  </div>
  );
};

const mapStateToProps = (state) => ({
  coleccionTiposJornada: state.tiposJornada.coleccionTiposJornada,
  isFetching: state.tiposJornada.isFetching
});

export default connect( mapStateToProps, { getTiposJornada, borrarTipoJornada, cargaFormTipoJornada } )( TiposJornada );