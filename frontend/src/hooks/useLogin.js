import { useState } from "react";

export const useLogin = () => {

    const [ isLoggedIn, setIsLoggedIn ]  = useState( false );

    
    // setIsLoggedIn ( JSON.parse(sessionStorage.getItem('isLoggedIn')) || false );

    // Loguearse
    const login = ( usuario, contrasenia ) => {
        localStorage.setItem('isLoggedIn', JSON.stringify( true ));
        setIsLoggedIn( true );
    };

    // Logout
    const logout = () => {
        localStorage.setItem('isLoggedIn', JSON.stringify( false ));
        setIsLoggedIn( false );
    }

    return [
        isLoggedIn,
        login,
        logout
    ]

}