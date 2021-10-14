import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TiposJornada from "../../components/TiposJornada.component";
import CargaTiposJornada from "../../components/Carga.tiposjornada.component"

//Redirige lo relativo a tipos de jornada.

const TiposJornadaRoutes = ({ match, isLoggedIn, admin }) => {
    return (<>
        {/* Si no está logueado, redirige a la principal, que luego redirige al login */}
        { !isLoggedIn ? <Redirect to = "/" /> :
            // Valida si es admin o no para redireccionar
            !admin ? <Redirect to = "/noautorizado" /> :
            <Switch>
                <Route exact path = {`${match.path}`} render = { () => <TiposJornada  /> } />
                <Route exact path={`${match.path}/carga`} render={() => {
                    return <CargaTiposJornada />
                }} />
            </Switch>
        }
    </>)
}

export default TiposJornadaRoutes;