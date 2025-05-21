import express from 'express';
import bookRoutes from './routes/bookRoutes';
import pool from './db';
import { initializeTables } from './models/initializeTables';

const app = express();
const port = 3000;

app.use(express.json());

// Inicializar la base de datos y las tablas
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    console.log('Conexión a la base de datos exitosa');
    // Inicializar tablas
    await initializeTables(pool);
    client.release();
    // Iniciar el servidor solo después de que la base de datos esté lista
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al sistema de gestión de bibliotecas!');
});
// Iniciar la aplicación
initializeDatabase();
// Rutas para libros
app.use('/api/books', bookRoutes);

