import express from 'express';
import AuthAutores from '../controllers/autores.js';
import AuthLibros from '../controllers/libros.js';
import Auth from '../controllers/login.js';



const rutas = express.Router();
const auth = new Auth();
const authAutores = new AuthAutores();
const authLibros = new AuthLibros();


rutas.post('/login', auth.login);
rutas.post('/crear_usuario', auth.crearUsuario);
rutas.get('/consultar_usuario', auth.consultarUsuarios);
rutas.post('/actualizar_usuario', auth.actualizarUsuarios)
rutas.post('/eliminar_usuario', auth.eliminarUsuarios);

rutas.post('/crear_autor', authAutores.crearAutor);
rutas.get('/consultar_autor', authAutores.consultarAutor);
rutas.post('/actualizar_autor', authAutores.actualizarAutor);
rutas.post('/eliminar_autor', authAutores.eliminarAutor);

rutas.post('/crear_libro', authLibros.crearLibro);
rutas.get('/consultar_libro', authLibros.consultarLibros);
rutas.post('/actualizar_libro', authLibros.actualizarLibros);
rutas.post('/eliminar_libro', authLibros.eliminarLibros);


export default rutas;


