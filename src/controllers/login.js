// import { getConnection, sql } from "../database/conexion.js";
import connect from "../database/conexionMysql.js";
// import { consultas } from "../database/consultas.js";
import { decryptPassword, encrytPassword } from "../shared/password.js";

export default class Auth {

    login = async (req, res) => {
        const { email, pass } = req.body;
        const conn = await connect();
        console.log(email)
        try {

            const Query = await conn.query('SELECT pass FROM usuarios WHERE email=?', [email])

            if (Query[0].length > 0) {
                console.log(Query)
                const contrasenaEncriptada = await decryptPassword(Query[0][0].pass, pass)

                if (contrasenaEncriptada) {
                    return res.json({ response: true })
                }

            }

            return res.json({ response: false })

        } catch (error) {
            return res.json(error)

        }

        // try {
        //     const pool = await getConnection();
        //     const request = pool.request();
        //     request.input("email", email);

        //     const resultado = await request.query(consultas.login);

        //     if (resultado.recordset.length > 0) {

        //         const contrasenaValidado = await decryptPassword(resultado.recordset[0].pass, pass)

        //         if (contrasenaValidado) {
        //             return res.json("Usuario autenticado")
        //         }
        //     }

        //     return res.json("Usuario o contraseña incorrecta")

        // } catch (error) {
        //     res.json(error);
        // }

    }

    crearUsuario = async (req, res) => {
        const { nombres, apellidos, cedula, email, pass } = req.body;
        const passwordCifrado = await encrytPassword(pass);

        const conn = await connect();

        try {

            const Insert = await conn.query('INSERT INTO usuarios (nombres, apellidos, cedula, email, pass) VALUES (?,?,?,?,?)', [nombres, apellidos, cedula, email, passwordCifrado]);

            if (Insert[0].affectedRows > 0) {
                return res.json({ response: true })
            }

            return res.json({ response: false });

        } catch (error) {
            return res.json(error);

        }

        // try {
        //     const pool = await getConnection();
        //     const request = pool.request();

        //     request.input("nombres", sql.VarChar, nombres)
        //     request.input("apellidos", sql.VarChar, apellidos)
        //     request.input("cedula", sql.VarChar, cedula)
        //     request.input("email", sql.VarChar, email)
        //     request.input("pass", sql.VarChar, passwordCifrado)

        //     const resultado = await request.query(consultas.crearUsuario);

        //     const datosInsertados = {
        //         id: resultado.recordset[0].id,
        //         nombres: nombres,
        //         apellidos: apellidos,
        //         cedula: cedula,
        //         email: email,
        //         pass: pass
        //     }
        //     res.json(datosInsertados)

        // } catch (error) {
        //     res.status(500)
        //     res.json('error')

        // }
    }

    // login(req, res) {
    //     let user = req.body.user;
    //     let password = req.body.password;

    //     let userSQL = "daver";
    //     let passwordSQL = "admin123";
    //     let mensaje = "";

    //     if (user === userSQL && password === passwordSQL) {
    //         mensaje = 'Autenticado'
    //     }

    //     else {
    //         mensaje = 'Usuario o contraseña incorrecto'
    //     }

    //     res.status(200).json({
    //         'mensaje': mensaje
    //     })
    // }

    consultarUsuarios = async (req, res) => {
        const conn = await connect();

        try {
            const Query = await conn.query('SELECT * FROM usuarios')

            if (Query[0].length > 0) {
                return res.json(Query[0])
            }

        } catch (error) {
            return res.json(error)
        }
    }

    actualizarUsuarios = async (req, res) => {
        const { nombres, apellidos, email } = req.body;
        const conn = await connect();

        try {
            const Update = await conn.query('UPDATE usuarios SET nombres=?, apellidos=? WHERE email = ?', [nombres, apellidos, email]);

            if (Update[0].affectedRows > 0) {
                return res.json({ response: true })
            }
            return res.json({ response: false })

        } catch (error) {
            return res.json(error)

        }
    }

    eliminarUsuarios = async (req, res) => {
        const { email } = req.body;
        const conn = await connect();

        try {
            const Eliminar = await conn.query('DELETE FROM usuarios WHERE email = ?', [email]);

            if (Eliminar[0].affectedRows > 0) {
                return res.json({ response: true })
            }
            return res.json({ response: false })

        } catch (error) {
            return res.json(error)

        }
    }

}