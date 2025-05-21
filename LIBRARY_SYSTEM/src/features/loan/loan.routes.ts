import express from 'express';
import { Router } from 'express';
import { createLoan, getLoans, getLoanById, returnBook, getActiveLoans } from './loan.controller';

const router: Router = express.Router();

// Rutas para préstamos
router.post('/', createLoan);
router.get('/', getLoans);
router.get('/active', getActiveLoans);
router.get('/:id', getLoanById);
router.put('/:id/return', returnBook);

export default router;
