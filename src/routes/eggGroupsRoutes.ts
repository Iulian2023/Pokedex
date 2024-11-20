import { Router } from 'express';
import { getEggGroups, getEggGroup } from '../controllers/eggGroupsController';

const router = Router();

router.get('/egg-groups', getEggGroups);
router.get('/egg-groups/:id', getEggGroup);

export default router;