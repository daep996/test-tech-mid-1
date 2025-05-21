import express from 'express';
import {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary
} from './library.controller';

const router = express.Router();

// Get all libraries
router.get('/', getAllLibraries);

// Get library by ID
router.get('/:id', getLibraryById);

// Create new library
router.post('/', createLibrary);

// Update library
router.put('/:id', updateLibrary);

// Delete library
router.delete('/:id', deleteLibrary);

export default router;
