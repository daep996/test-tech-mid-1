import express from 'express';
import bookRoutes from './features/book/book.routes';
import libraryRoutes from './features/library/library.routes';
import memberRoutes from './features/member/member.routes';
import loanRoutes from './features/loan/loan.routes';
import pool from './db/db';
import { initializeTables } from './db/initializeTables';

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
// Rutas para bibliotecas
app.use('/api/libraries', libraryRoutes);
// Rutas para miembros
app.use('/api/members', memberRoutes);
// Rutas para préstamos
app.use('/api/loans', loanRoutes);

