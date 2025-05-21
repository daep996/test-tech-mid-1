import { Request, Response } from 'express';
import pool from '../../db/db';

// Crear un nuevo miembro
export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const joinedDate = new Date().toISOString();
    const result = await pool.query(
      'INSERT INTO members (name, email, joined_date) VALUES ($1, $2, $3) RETURNING *',
      [name, email, joinedDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear miembro:', error);
    res.status(500).json({ message: 'Error al crear miembro' });
  }
};

// Obtener todos los miembros
export const getMembers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM members');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener miembros:', error);
    res.status(500).json({ message: 'Error al obtener miembros' });
  }
};

// Obtener un miembro por ID
export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener miembro:', error);
    res.status(500).json({ message: 'Error al obtener miembro' });
  }
};

// Actualizar un miembro
export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    // Primero obtenemos el miembro actual
    const currentMember = await pool.query(
      'SELECT * FROM members WHERE id = $1',
      [id]
    );
    
    if (currentMember.rows.length === 0) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }

    // Creamos un objeto con los valores actuales
    const currentValues = currentMember.rows[0];
    
    // Construimos la consulta dinámicamente basada en los campos proporcionados
    const updateFields = [];
    const queryParams = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramIndex}`);
      queryParams.push(name);
      paramIndex++;
    }
    if (email !== undefined) {
      updateFields.push(`email = $${paramIndex}`);
      queryParams.push(email);
      paramIndex++;
    }
    if (phone !== undefined) {
      updateFields.push(`phone = $${paramIndex}`);
      queryParams.push(phone);
      paramIndex++;
    }

    // Si no hay campos para actualizar, devolvemos el miembro actual
    if (updateFields.length === 0) {
      return res.json(currentValues);
    }

    // Agregamos el ID al final de los parámetros
    queryParams.push(id);

    const result = await pool.query(
      `UPDATE members SET ${updateFields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      queryParams
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar miembro:', error);
    res.status(500).json({ message: 'Error al actualizar miembro' });
  }
};

// Eliminar un miembro
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    
    res.json({ message: 'Miembro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar miembro:', error);
    res.status(500).json({ message: 'Error al eliminar miembro' });
  }
}; 