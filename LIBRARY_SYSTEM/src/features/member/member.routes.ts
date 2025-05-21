import express from 'express';
import { Router } from 'express';
import { createMember, getMembers, getMemberById, updateMember, deleteMember } from './member.controller';

const router: Router = express.Router();

// Rutas para miembros
router.post('/', createMember);
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
