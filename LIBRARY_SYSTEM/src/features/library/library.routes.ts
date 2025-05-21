import express from 'express';
import pool from '../../db/db';

const router = express.Router();

// Get all libraries
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM libraries');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las bibliotecas' });
  }
});

// Get library by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM libraries WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Biblioteca no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la biblioteca' });
  }
});

// Create new library
router.post('/', async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO libraries (name, address) VALUES ($1, $2) RETURNING *',
      [name, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la biblioteca' });
  }
});

// Update library
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE libraries SET name = $1, address = $2 WHERE id = $3 RETURNING *',
      [name, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Biblioteca no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la biblioteca' });
  }
});

// Delete library
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM libraries WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Biblioteca no encontrada' });
    }
    res.json({ message: 'Biblioteca eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la biblioteca' });
  }
});

export default router;
