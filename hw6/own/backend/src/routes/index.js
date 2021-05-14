import { Router } from 'express';
import scoreCardRouter from './api/scoreCard';

const router = Router();

router.use('/api', scoreCardRouter);

export default router;
