import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Empleados from "../../components/Empleados.component";
import CargaEmpleados from "../../components/Carga.empleados.component";

const EmpeladosRoutes = ({ match, isLoggedIn, admin }) => {

    console.log(match.path);

    return (<>
        { 
        !isLoggedIn ? <Redirect to = "/" /> : 
            !admin ? <Redirect to = "/noautorizado" /> :
            <Switch>

                <Route exact path = {`${match.path}`} render = { () => <Empleados  /> } />

                <Route exact path={`${match.path}/carga`} render={() => {
                    return <CargaEmpleados />
                }} />

            </Switch>  
        }
    </>)
}

export default EmpeladosRoutes;