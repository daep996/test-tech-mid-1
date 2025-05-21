import express from "express";
import { getAllBooks, createBook, updateBook, deleteBook, getBookById } from "./book.controller";

const router = express.Router();

// Ruta para obtener todos los libros
router.get("/", getAllBooks);

// Ruta para obtener un libro por ID
router.get("/:id", getBookById);

// Ruta para agregar un nuevo libro
router.post("/", createBook);

// Ruta para actualizar un libro
router.put("/:id", updateBook);

// Ruta para eliminar un libro
router.delete("/:id", deleteBook);

export default router;
