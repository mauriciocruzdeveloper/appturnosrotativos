import { combineReducers } from "redux";
import EmpleadosReducer from "./Empleados/Empleados.reducer";
import LoginReducer from "./Login/Login.reducer";
import TipoJornadaReducer from "./TipoJornada/TipoJornada.reducer";
import TurnosReducer from "./Turnos/Turnos.reducer";

// Aquí se centralizan los reducers. Cuando se importan los reducers desde otros archivos, se hace desde éste.
export default combineReducers({ 
    tiposJornada: TipoJornadaReducer, 
    empleados: EmpleadosReducer, 
    login: LoginReducer,
    turnos: TurnosReducer
});