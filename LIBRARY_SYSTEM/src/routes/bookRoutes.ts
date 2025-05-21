import express from 'express';
import pooldb from '../db';

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const result = await pooldb.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// Ruta para agregar un nuevo libro
router.post('/', async (req, res) => {
  const { title, author, isbn, publishedDate, libraryId } = req.body;
  try {
    const result = await pooldb.query(
      'INSERT INTO books (title, author, isbn, published_date, library_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, isbn, new Date().toISOString(), libraryId]
    );
    console.log(`result: ${result}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al agregar el libro' });
  }
});

// Ruta para actualizar un libro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publishedDate, libraryId } = req.body;
  try {
    const result = await pooldb.query(
      'UPDATE books SET title = $1, author = $2, isbn = $3, published_date = $4, library_id = $5 WHERE id = $6 RETURNING *',
      [title, author, isbn, publishedDate, libraryId, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

// Ruta para eliminar un libro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pooldb.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

export default router;
