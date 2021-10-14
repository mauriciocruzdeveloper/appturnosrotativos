// Se importa mongoose
const mongoose = require( "mongoose" );

// Se define schema TipoJornada

const schemaTipoJornada = mongoose.Schema({
    tipo: { 
        type: String,
        required: [true, 'Debe ingresar el tipo de jornada']
    }
});

// Query helper - get tipos de jornada por tipo
schemaTipoJornada.query.byTipo = function( tipo ) {
    return this.findOne({ tipo: tipo });
};

module.exports = mongoose.model( "TipoJornada", schemaTipoJornada );