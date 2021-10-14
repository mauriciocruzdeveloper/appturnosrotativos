import store from './redux/store.js';

const token = store.getState().login.usuario.token;

console.log("token en token: " + token);

export default token;
    // Hago esto para traer el token del estado de redux. Me pareció no muy prolijo,
    // pero es más práctico que pasarlo como propiedad de cada formulario donde se dispare un evento
    // que termine en una consulta al servidor.
 