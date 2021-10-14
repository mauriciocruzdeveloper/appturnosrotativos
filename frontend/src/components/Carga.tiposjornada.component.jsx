import React from "react";
import history from "../history";
import { connect } from "react-redux";

import { 
    agregarTipoJornada, 
    tipoOnChange
} from "../redux/root-actions";

const CargaTipoJornada = ({ 
    agregarTipoJornada, 
    tipoOnChange,
    tipo }) => {
        
    const handleGuardar = async () => {
        await agregarTipoJornada( tipo );
        history.goBack();
    };

    return(

    <div className="container bg-warning">
        <div className="row">
            <div className="col-md-12 order-md-1">

                <div className="row">
                    <div className="mb-3">
                        <label>Tipo de Jornada</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="tipo" 
                            placeholder="Ingrese tipo de jornada"
                            value={ tipo }
                            onChange={ (e) => tipoOnChange( e.target.value ) } 
                        />
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 order-md-1">
                <button type="button" className="btn btn-dark float-left" onClick={ handleGuardar }>Guardar</button>
            </div>
            <div className="col-md-4 order-md-1"></div>
            <div className="col-md-4 order-md-1">
                <button type="button" className="btn btn-dark float-right" onClick={ () => history.goBack() }>Cerrar</button>
            </div>

        </div>
    </div>

    );
  };

  const mapStateToProps = (state) => ({
    tipo: state.tiposJornada.form.tipo,
  });
  
  export default connect( mapStateToProps, { agregarTipoJornada, tipoOnChange } )( CargaTipoJornada );