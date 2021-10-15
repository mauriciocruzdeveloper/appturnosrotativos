// Importaciones

const express = require( "express" );
const Empleado = require( "./modelos/Empleado" );
const TipoJornada = require("./modelos/TipoJornada");
const Turno = require("./modelos/Turno");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const rutasProtegidas = express.Router(); 


//////////////////////////////////////
//////////   TOKEN Y LOGIN   /////////
//////////////////////////////////////

// rutasProtegidas es una función que se agrega a las llamadas al servidor y
// verifica que el token sea el correcto, sino no deja pasar
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['autorization'];
    if (token) {
        const semilla = process.env.SEMILLA_JWT;
        jwt.verify(token, semilla, (err, decoded) => {      
            if (err) {
                console.log("error en verify: " + err)
                return res.status(401).json({ mensaje: 'Token inválida' });    
            } else {
                console.log("decoded en verify: " + JSON.stringify(decoded))
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.status(401).json({ mensaje: 'Token no proveída.' });
    }
 });


 // POST - Verifica el email y la contraseña para el login
router.post( "/empleados/login", async ( req, res ) => {
    const body = req.body;
    const user = await Empleado.findOne({ email: body.email });
    const semilla = process.env.SEMILLA_JWT;

    if (user) {
      // Compara el password que envié con el de la base de datos
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        // Genero el token y lo mando con el usuario en la propiedad "token"
        const payload = {
            email: body.email,
            nombre: user.nombre
        }; // El payload es el email y el nombre de usuario
        const token = jwt.sign(payload, semilla, {
            expiresIn: 1440
        });
        res.send(
            {
            ...user._doc,
            // Mando el token junto a los datos del usuario
            token: token
            }
        );
        res.status(200).json({ message: "Password Válido" });
      } else {
        res.status(401).json({ error: "Password Inválido" });
      }
    } else {
      res.status(404).json({ error: "No se encontró el usuario" });
    }
});


//////////////////////////////////
//////////   EMPLEADOS   /////////
//////////////////////////////////

// GET - Devuelve el listado de empleados
router.get( "/empleados", rutasProtegidas, async ( req, res ) => {
    try {
        const empleados = await Empleado.find();
        res.send( empleados );
    } catch {
        res.status( 404 );
        res.send({ error: "Hubo un problema" });
    };
});


// POST - Permite dar de alta una persona
router.post( "/empleados", rutasProtegidas, async ( req, res ) => {
    try {
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
    } catch {
        res.status( 400 );
        res.send({ error: "Hubo un problema al cargar" });
    };
});

// GET - Permite traer un empleado en particular por id
router.get( "/empleados/:id", rutasProtegidas, async ( req, res ) => { 
    try {
        const empleado = await Empleado.findOne({ _id: req.params.id });
        res.send( empleado );
    } catch {
        res.status( 404 );
        res.send({ error: "El empleado no existe!" });
    };
});


// PATCH - Permite actualizar un empleado por email
router.patch( "/empleados/:email", rutasProtegidas, async ( req, res ) => {
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
router.delete( "/empleados/:id", rutasProtegidas, async ( req, res ) => {
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
router.get( "/empleadosByEmail/:email", rutasProtegidas, async ( req, res ) => {
    try {
        const empleado = await Empleado.find().byEmail( req.params.email );
        res.send( empleado );
    } catch {
        res.status( 404 );
        res.send({ error: "Empleado no existe!" });
    }
    
});


//////////////////////////////////
//////   TIPOS DE JORNADA   //////
//////////////////////////////////

// Query helper - get tipo de jornada por tipo (EXACTO)
router.get( "/tipojornadaByTipo/:tipo", rutasProtegidas, async ( req, res ) => {
    try {
        const tipojornada = await TipoJornada.find().byTipo( req.params.tipo );
        res.send( tipojornada );
    } catch {
        res.status( 404 );
        res.send({ error: "Tipo de Jornada no existe!" });
    }
    
});

// GET - Devuelve el listado de tipos de jornada
router.get( "/tiposjornada", rutasProtegidas, async ( req, res ) => {
    try {
        const tipoJornada = await TipoJornada.find();
        res.send( tipoJornada );
    } catch {
        res.status( 404 );
        res.send({ error: "Hubo un problema" });
    };
});

// POST - Permite dar de alta una tipo de jornada
router.post( "/tiposjornada", rutasProtegidas, async ( req, res ) => {
    try {
        const tipoJornada = new TipoJornada({
            tipo: req.body.tipo
        });
        await tipoJornada.save();
        res.send( tipoJornada );
    } catch {
        res.status( 400 );
        res.send({ error: "Hubo un problema al cargar" });
    };
});


// DELETE - Permite borrar un tipo de jornada por id
router.delete( "/tiposjornada/:id", rutasProtegidas, async ( req, res ) => {
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
router.get( "/turnos", rutasProtegidas, async ( req, res ) => {
    try {
        const turnos = await Turno.find();
        res.send( turnos );
    } catch {
        res.status( 404 );
        res.send({ error: "Hubo un problema" });
    };
});

// POST - Permite dar de alta una tipo de jornada
router.post( "/turnos", rutasProtegidas, async ( req, res ) => {
    try {
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
    } catch {
        res.status( 400 );
        res.send({ error: "Hubo un problema al cargar" });
    };



});

// DELETE - Permite borrar un tipo de jornada por id
router.delete( "/turnos/:id", rutasProtegidas, async ( req, res ) => {
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
router.get( "/turnosByMes/:anio/:mes", rutasProtegidas, async ( req, res ) => {
    try {
        const turnos = await Turno.find().byMes( req.params.anio, req.params.mes);
        res.send(turnos);
    } catch {
        res.status( 404 );
        res.send({ error: "Turno no existe!" });  
    };
});

// Exportable
module.exports = router;