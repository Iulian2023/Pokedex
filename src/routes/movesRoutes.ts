import { Router } from 'express';
import { getMoves, getMove } from '../controllers/movesController';

const router = Router();

router.get('/moves', getMoves);
router.get('/moves/:id', getMove);

export default router;