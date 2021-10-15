import React from "react";
import history from "../history";
import { connect } from "react-redux";

import { 
    agregarEmpleado, 
    nombreOnChange, 
    emailOnChange, 
    passwordOnChange,
    adminOnChange
} from "../redux/root-actions";

const CargaEmpleados = ( { 
    agregarEmpleado, 
    nombreOnChange, 
    emailOnChange, 
    passwordOnChange,
    adminOnChange, 
    nombre, 
    email, 
    password,
    admin,
    modifica, } ) => {

    // Este componente es la pantalla de carga de los empleados. Importa los métodos desde el root de acciones,
    // y las variables de estado desde redux mediante mapStateToProps. Luego ingresan como props del componente.
        
    const handleGuardar = async () => {
        const response = await agregarEmpleado( nombre, email, password, !!admin, modifica );
        if (response?.status == 400){ return history.push('/ocurrioproblema')};
        if (response?.status == 401){ return history.push('/noautorizado')};
        history.goBack();
    };

    return(

    <div className="container bg-warning">
        <div className="row">
            <div className="col-md-12 order-md-1">

                <div className="row">
                    <div className="mb-3">
                        <label>Nombre del Empleado</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre" 
                            placeholder="Ingrese su nombre y apellido"
                            value={ nombre }
                            onChange={ (e) => nombreOnChange( e.target.value ) } 
                            required
                        />
                    </div>
                    

                    <div className="mb-3">
                        <label>Correo electrónic</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Ejemplo: you@example.com"
                            value={ email }
                            onChange={ (e) => emailOnChange( e.target.value ) }
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="password" 
                            placeholder="Ingrese un password"
                            value={ password }
                            onChange={ (e) => passwordOnChange( e.target.value ) }
                            readOnly= { modifica? true : false }
                            required
                        />
                    </div>

                    <div className="custom-control custom-checkbox">
                    <label className="custom-control-label">Administrador</label>
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id="customCheck1"
                            checked={ admin }
                            onChange={ () => adminOnChange( !admin ) }
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
    nombre: state.empleados.form.nombre,
    email: state.empleados.form.email,
    password: state.empleados.form.password,
    admin: state.empleados.form.admin,
    modifica: state.empleados.form.modifica
  });
  
  export default connect( mapStateToProps, { agregarEmpleado, nombreOnChange, emailOnChange, passwordOnChange, adminOnChange } )( CargaEmpleados );