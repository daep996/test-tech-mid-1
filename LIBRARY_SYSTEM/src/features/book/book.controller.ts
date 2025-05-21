import { Request, Response } from 'express';
import pooldb from "../../db/db";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await pooldb.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, isbn, publishedDate, libraryId } = req.body;
  try {
    const result = await pooldb.query(
      "INSERT INTO books (title, author, isbn, published_date, library_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, isbn, new Date().toISOString(), libraryId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el libro" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, isbn, publishedDate, libraryId } = req.body;
  
  try {
    // Primero obtenemos el libro actual
    const currentBook = await pooldb.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (currentBook.rows.length === 0) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    // Creamos un objeto con los valores actuales
    const currentValues = currentBook.rows[0];
    
    // Construimos la consulta dinámicamente basada en los campos proporcionados
    const updateFields = [];
    const queryParams = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updateFields.push(`title = $${paramIndex}`);
      queryParams.push(title);
      paramIndex++;
    }
    if (author !== undefined) {
      updateFields.push(`author = $${paramIndex}`);
      queryParams.push(author);
      paramIndex++;
    }
    if (isbn !== undefined) {
      updateFields.push(`isbn = $${paramIndex}`);
      queryParams.push(isbn);
      paramIndex++;
    }
    if (publishedDate !== undefined) {
      updateFields.push(`published_date = $${paramIndex}`);
      queryParams.push(publishedDate);
      paramIndex++;
    }
    if (libraryId !== undefined) {
      updateFields.push(`library_id = $${paramIndex}`);
      queryParams.push(libraryId);
      paramIndex++;
    }

    // Si no hay campos para actualizar, devolvemos el libro actual
    if (updateFields.length === 0) {
      return res.json(currentValues);
    }

    // Agregamos el ID al final de los parámetros
    queryParams.push(id);

    const result = await pooldb.query(
      `UPDATE books SET ${updateFields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      queryParams
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pooldb.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pooldb.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el libro" });
  }
}; 