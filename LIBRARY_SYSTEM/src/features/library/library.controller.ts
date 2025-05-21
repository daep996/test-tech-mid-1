import { Request, Response } from 'express';
import pool from '../../db/db';

export const getAllLibraries = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM libraries');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las bibliotecas' });
  }
};

export const getLibraryById = async (req: Request, res: Response) => {
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
};

export const createLibrary = async (req: Request, res: Response) => {
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
};

export const updateLibrary = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address } = req.body;
  
  try {
    // Primero obtenemos la biblioteca actual
    const currentLibrary = await pool.query(
      'SELECT * FROM libraries WHERE id = $1',
      [id]
    );

    if (currentLibrary.rows.length === 0) {
      return res.status(404).json({ error: 'Biblioteca no encontrada' });
    }

    // Creamos un objeto con los valores actuales
    const currentValues = currentLibrary.rows[0];
    
    // Construimos la consulta dinámicamente basada en los campos proporcionados
    const updateFields = [];
    const queryParams = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramIndex}`);
      queryParams.push(name);
      paramIndex++;
    }
    if (address !== undefined) {
      updateFields.push(`address = $${paramIndex}`);
      queryParams.push(address);
      paramIndex++;
    }

    // Si no hay campos para actualizar, devolvemos la biblioteca actual
    if (updateFields.length === 0) {
      return res.json(currentValues);
    }

    // Agregamos el ID al final de los parámetros
    queryParams.push(id);

    const result = await pool.query(
      `UPDATE libraries SET ${updateFields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      queryParams
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la biblioteca' });
  }
};

export const deleteLibrary = async (req: Request, res: Response) => {
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
}; 