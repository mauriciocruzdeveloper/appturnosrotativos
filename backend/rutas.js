// Importaciones

const express = require( "express" );
const Empleado = require( "./modelos/Empleado" );
const TipoJornada = require("./modelos/TipoJornada");
const Turno = require("./modelos/Turno");
const router = express.Router();
const bcrypt = require('bcrypt');


//////////////////////////////////
//////////   EMPLEADOS   /////////
//////////////////////////////////

// GET - Devuelve el listado de empleados
router.get( "/empleados", async ( req, res ) => {
    try {
        const empleados = await Empleado.find();
        res.send( empleados );
    } catch {
        res.status( 404 );
        res.send({ error: "Hubo un problema" });
    };
});


// POST - Permite dar de alta una persona
router.post( "/empleados", async ( req, res ) => {

    // La contraseña se encripta del lado del servidor por seguridad
    const pass = bcrypt.hashSync(req.body.password, 10);

    const empleado = new Empleado({
        nombre: req.body.nombre,
        email: req.body.email,
        password: pass,
        admin: req.body.admin
    });
    await empleado.save();
    res.send( empleado );
});

// GET - Permite traer un empleado en particular por id
router.get( "/empleados/:id", async ( req, res ) => { 
    try {
        const empleado = await Empleado.findOne({ _id: req.params.id });
        res.send( empleado );
    } catch {
        res.status( 404 );
        res.send({ error: "El empleado no existe!" });
    };
});


// PATCH - Permite actualizar un empleado por email
router.patch( "/empleados/:email", async ( req, res ) => {
    try {
        const empleado = await Empleado.find().byEmail(req.params.email );
        if ( req.body.nombre ) {
            empleado.nombre = req.body.nombre;
        };
        if ( req.body.email ) {
            empleado.email = req.body.email;
        };
        if ( req.body.password ) {
            empleado.password = req.body.password;
        };
        // Lo tengo que comentar porque sino no pasa el if cuando es falso.
        // if ( req.body.admin ) {
            empleado.admin = req.body.admin;
        // };
        await empleado.save();
        res.send( empleado );
    } catch {
        res.status( 404 );
        res.send( "Empleado no existe!" );
    };
});

// DELETE - Permite borrar un empleado por id
router.delete( "/empleados/:id", async ( req, res ) => {
    console.log( 'Delete -> ' + req.params.id );
    try {
        await Empleado.deleteOne({ _id: req.params.id });
        res.send("Empleado borrado");
        res.status( 204 ).send();
    } catch {
        res.status( 404 );
        res.send({ error: "Empleado no existe!" });  
    };
});

// Query helper - get empleado por email (EXACTO)
router.get( "/empleadosByEmail/:email", async ( req, res ) => {
    try {
        const empleado = await Empleado.find().byEmail( req.params.email );
        res.send( empleado );
    } catch {
        res.status( 404 );
        res.send({ error: "Empleado no existe!" });
    }
    
});

// POST - Verifica el email y devuelve true o false
router.post( "/empleados/login", async ( req, res ) => {
    
    console.log("password en rutas: " + req.body.password);
    console.log("email en rutas: " + req.body.email);

    const body = req.body;
    const user = await Empleado.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
        console.log("password en body: " + body.password);
        console.log("password en user: " + user.password);
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.send(user);
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
});

//////////////////////////////////
//////   TIPOS DE JORNADA   //////
//////////////////////////////////

// Query helper - get tipo de jornada por tipo (EXACTO)
router.get( "/tipojornadaByTipo/:tipo", async ( req, res ) => {
    try {
        const tipojornada = await TipoJornada.find().byTipo( req.params.tipo );
        res.send( tipojornada );
    } catch {
        res.status( 404 );
        res.send({ error: "Tipo de Jornada no existe!" });
    }
    
});

// GET - Devuelve el listado de tipos de jornada
router.get( "/tiposjornada", async ( req, res ) => {
    try {
        const tipoJornada = await TipoJornada.find();
        res.send( tipoJornada );
    } catch {
        res.status( 404 );
        res.send({ error: "Hubo un problema" });
    };
});

// POST - Permite dar de alta una tipo de jornada
router.post( "/tiposjornada", async ( req, res ) => {
    const tipoJornada = new TipoJornada({
        tipo: req.body.tipo
    });
    await tipoJornada.save();
    res.send( tipoJornada );
});


// DELETE - Permite borrar un tipo de jornada por id
router.delete( "/tiposjornada/:id", async ( req, res ) => {
    console.log( 'Delete -> ' + req.params.id );
    try {
        await TipoJornada.deleteOne({ _id: req.params.id });
        res.send("Tipo de Jornada borrada");
        res.status( 204 ).send();
    } catch {
        res.status( 404 );
        res.send({ error: "Tipo de Jornada no existe!" });  
    };
});

//////////////////////////////////
///////////   TURNOS   ///////////
//////////////////////////////////

// GET - Devuelve el listado de tipos de jornada
router.get( "/turnos", async ( req, res ) => {
    try {
        const turnos = await Turno.find();
        res.send( turnos );
    } catch {
        res.status( 404 );
        res.send({ error: "Hubo un problema" });
    };
});

// POST - Permite dar de alta una tipo de jornada
router.post( "/turnos", async ( req, res ) => {

    const turno = new Turno({
        dia: req.body.dia,
        mes: req.body.mes,
        anio: req.body.anio,
        empleado: req.body.empleado,
        tipoJornada: req.body.tipoJornada,
        horario: req.body.horario
    });
    await turno.save();
    res.send( turno );
});

// DELETE - Permite borrar un tipo de jornada por id
router.delete( "/turnos/:id", async ( req, res ) => {
    console.log( 'Delete -> ' + req.params.id );
    try {
        await Turno.deleteOne({ _id: req.params.id });
        res.send("Turno borrado");
        res.status( 204 ).send();
    } catch {
        res.status( 404 );
        res.send({ error: "Turno no existe!" });  
    };
});

// Query helper - Turnos por año/mes
router.get( "/turnosByMes/:anio/:mes", async ( req, res ) => {
    const turnos = await Turno.find().byMes( req.params.anio, req.params.mes);
    res.send(turnos);
});

// Exportable
module.exports = router;