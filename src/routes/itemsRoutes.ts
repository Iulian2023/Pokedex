import { Router } from 'express';
import { getItems, getItem } from '../controllers/itemsController';

const router = Router();

router.get('/items', getItems);
router.get('/items/:id', getItem);

export default router;