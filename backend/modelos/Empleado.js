// Se importa mongoose
const mongoose = require( "mongoose" );

// Se define schema Empleado

const schemaEmpleado = mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, 'Debe ingresar el nombre']
    },
    email: { 
        type: String,
        required: [true, 'Debe ingresar el email']
    },
    password: { 
        type: String,
        required: [true, 'Debe ingresar el pasword']
    },
    admin: { 
        type: Boolean,
        required: [true, 'Debe ingresar el pasword']
    }

});

// Se valida e-mail con expresión regular
schemaEmpleado.path( 'email' ).validate(( value ) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test( value );
  }, 'Sintaxis de e-mail erróneo' );

// Query helper - get empleados por email (EXACTO)
schemaEmpleado.query.byEmail = function( email ) {
    return this.findOne({ email: email });
}


module.exports = mongoose.model( "Empleado", schemaEmpleado );