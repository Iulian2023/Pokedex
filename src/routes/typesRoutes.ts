import { Router } from 'express';
import { getTypes, getType, createType, updateTypeController, deleteTypeController } from '../controllers/typesController';

const router = Router();

router.get('/types', getTypes);
router.get('/types/:id', getType);
router.post('/types-insert', createType);
router.put('/types-update/:id', updateTypeController);
router.delete('/types-delete/:id', deleteTypeController);

export default router;