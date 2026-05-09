import { Router } from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Admin / Coordinator only routes
router.post('/', authenticate, authorize(['ADMIN', 'COORDINATOR']), createEvent);
router.put('/:id', authenticate, authorize(['ADMIN', 'COORDINATOR']), updateEvent);
router.delete('/:id', authenticate, authorize(['ADMIN', 'COORDINATOR']), deleteEvent);

export default router;
