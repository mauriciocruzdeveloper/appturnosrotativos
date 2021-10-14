// Se importa mongoose
const mongoose = require( "mongoose" );

// Se define schema Turno

const schemaTurno = mongoose.Schema({
    dia: {
        type: String,
        required: [true, 'Debe ingresar el Día']
    },
    mes: {
        type: String,
        required: [true, 'Debe ingresar el Mes']
    },
    anio: {
        type: String,
        required: [true, 'Debe ingresar el Año']
    },
    horario: {
        type: String,
        required: [true, 'Debe ingresar el Horario']
    },
    empleado: {
        type: String,
        required: [true, 'Debe ingresar el Empleado']
    },
    tipoJornada: {
        type: String,
        required: [true, 'Debe ingresar el Tipo de Jornada']
    },
});

// Query helper - get turnos por año/mes
schemaTurno.query.byMes = function( anio, mes ){
    return this.find( { anio: anio, mes: mes} );
};

module.exports = mongoose.model( "Turno", schemaTurno );