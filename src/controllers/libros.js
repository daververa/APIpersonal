import connect from "../database/conexionMysql.js";


export default class AuthLibros {

    crearLibro = async (req, res) => {
        const { nombreLibro, idAutor } = req.body;

        const conn = await connect();

        try {

            const Insert = await conn.query('INSERT INTO libros (nombreLibro, idAutor) VALUES(?,?)', [nombreLibro, idAutor]);

            console.log(Insert.nombreLibro)

            if (Insert[0].affectedRows > 0) {
                return res.json({ response: true })
            }
            return res.json({ response: false });

        } catch (error) {
            return res.json(error);
        }

    }

    consultarLibros = async (req, res) => {

        const conn = await connect();

        try {
            const consultarBooks = await conn.query('SELECT * FROM libros')

            if (consultarBooks[0].length > 0) {
                return res.json(consultarBooks[0])
            }

        } catch (error) {
            return res.json(error)
        }

    }

    actualizarLibros = async (req, res) => {
        const { idLibro, nombreLibro, idAutor } = req.body;

        const conn = await connect();

        try {
            const Update = await conn.query('UPDATE libros SET nombreLibro = ?, idAutor = ? WHERE idLibro =? ', [nombreLibro, idAutor, idLibro])

            if (Update[0].affectedRows > 0) {
                return res.json({ response: true })
            }

        } catch (error) {
            return res.json(error)
        }
    }

    eliminarLibros = async (req, res) => {
        const { nombreLibro } = req.body;
        const conn = await connect();

        try {
            const Eliminar = await conn.query('DELETE FROM libros WHERE nombreLibro = ?', [nombreLibro])

            if (Eliminar[0].affectedRows > 0) {
                return res.json({ response: true })
            }
            return res.json({ response: false })

        } catch (error) {
            return res.json(error)

        }
    }
}
