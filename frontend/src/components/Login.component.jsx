import React from "react";
import { connect } from "react-redux";
import { login, emailOnChangeLogin, passwordOnChangeLogin } from "../redux/root-actions";
import history from "../history";

const Login = ({ isFetching, login, emailOnChangeLogin, passwordOnChangeLogin, email, password }) => {

  const handleLogin = async () => {
    // Hice una promesa para que cuando no se puede loguear me mande a una página de error de login
    await login( email, password)
      .then( () => history.push("/") )
      .catch( () => history.push("/errorlogin") );    
  };

  return (
      isFetching ? <h3>cargando ....</h3> :
      <div className="bg-warning">

        <div className="text-center">
          <img src="img/25706.png" className="rounded" width= "70%"/> 
        </div>  
        <div>
          <h1 className="display-3 text-center text-dark">Bienvenido</h1>                              
        </div>
        <form className="row-auto">
          <div className="col-auto">	  
            <label className="">Email address</label>
            <input 
              value={ email }
              onChange={ (e) => emailOnChangeLogin( e.target.value ) }
              type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" 
            />
          </div>
          <div className="col-auto">
            <label className="">Password</label>
            <input 
              value={ password }
              onChange={ (e) => passwordOnChangeLogin( e.target.value ) }
              type="password" className="form-control" id="inputPassword2" placeholder="Password" 
            />
          </div> 
        </form>

        <div className="d-grid gap-2 col-5 mx-auto mt-4">    
        <button onClick={ () => handleLogin() } type="submit" className="btn btn-dark me-md-2">INGRESAR</button>
        </div>

      </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.login.usuario.email,
  password: state.login.usuario.password,
  admin: state.login.usuario.admin,
  isFetching: state.login.isFetching
});

export default connect(mapStateToProps, { login, emailOnChangeLogin, passwordOnChangeLogin })(Login);