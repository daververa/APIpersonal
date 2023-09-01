import connect from "../database/conexionMysql.js";


export default class AuthAutores {

    crearAutor = async (req, res) => {
        const { nombreAutor } = req.body;

        const conn = await connect();

        try {

            const Insert = await conn.query('INSERT INTO autores (nombreAutor) VALUES(?)', [nombreAutor]);

            if (Insert[0].affectedRows > 0) {
                return res.json({ response: true })
            }
            return res.json({ response: false });

        } catch (error) {
            return res.json(error);
        }

    }

    consultarAutor = async (req, res) => {

        const conn = await connect();

        try {
            const consultar_usuario = await conn.query('SELECT * FROM autores');

            console.log(consultar_usuario[0])

            if (consultar_usuario[0].length > 0) {
                return res.json(consultar_usuario[0])
            }


        } catch (error) {
            return res.json(error);

        }
    }

    actualizarAutor = async (req, res) => {
        const { idAutor, nombreAutor } = req.body;

        const conn = await connect();

        try {

            const Update = await conn.query('UPDATE autores SET nombreAutor = ? WHERE idAutor =? ', [nombreAutor, idAutor])

            if (Update[0].affectedRows > 0) {
                return res.json({ response: true })
            }

        } catch (error) {
            return res.json(error)
        }

    }

    eliminarAutor = async (req, res) => {

        const { nombreAutor } = req.body;
        const conn = await connect();

        try {
            const Eliminar = await conn.query('DELETE FROM autores WHERE nombreAutor = ?', [nombreAutor])

            if (Eliminar[0].affectedRows > 0) {
                return res.json({ response: true })
            }
            return res.json({ response: false })

        } catch (error) {
            return res.json(error)

        }



    }




}





