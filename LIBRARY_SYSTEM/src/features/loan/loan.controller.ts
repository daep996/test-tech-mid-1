import { Request, Response } from 'express';
import pool from '../../db/db';

// Crear un nuevo préstamo
export const createLoan = async (req: Request, res: Response) => {
  try {
    const { member_id, book_id, loan_date, return_date } = req.body;
    
    // Verificar si el libro está disponible
    const bookCheck = await pool.query(
      'SELECT * FROM books WHERE id = $1',
      [book_id]
    );
    if (bookCheck.rows.length === 0) {
      return res.status(400).json({ message: 'El libro no está disponible para préstamo' });
    }
    // Crear el préstamo
    const result = await pool.query(
      `INSERT INTO loans (member_id, book_id, loan_date, return_date) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [member_id, book_id, loan_date, return_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear préstamo:', error);
    res.status(500).json({ message: 'Error al crear préstamo' });
  }
};

// Obtener todos los préstamos
export const getLoans = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT l.*, m.name as member_name, b.title as book_title 
      FROM loans l
      JOIN members m ON l.member_id = m.id
      JOIN books b ON l.book_id = b.id
      ORDER BY l.loan_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    res.status(500).json({ message: 'Error al obtener préstamos' });
  }
};

// Obtener préstamos activos
export const getActiveLoans = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT l.*, m.name as member_name, b.title as book_title 
      FROM loans l
      JOIN members m ON l.member_id = m.id
      JOIN books b ON l.book_id = b.id
      WHERE l.returned = false
      ORDER BY l.due_date ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener préstamos activos:', error);
    res.status(500).json({ message: 'Error al obtener préstamos activos' });
  }
};

// Obtener un préstamo por ID
export const getLoanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT l.*, m.name as member_name, b.title as book_title 
      FROM loans l
      JOIN members m ON l.member_id = m.id
      JOIN books b ON l.book_id = b.id
      WHERE l.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener préstamo:', error);
    res.status(500).json({ message: 'Error al obtener préstamo' });
  }
};

// Devolver un libro
export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Actualizar el préstamo
    const result = await pool.query(
      `UPDATE loans 
       SET return_date = CURRENT_TIMESTAMP 
       WHERE id = $1 RETURNING *`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al devolver libro:', error);
    res.status(500).json({ message: 'Error al devolver libro' });
  }
}; 