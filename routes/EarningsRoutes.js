import express from 'express';
import { addEarnings } from '../controllers/EarningsController.js';
const router = express.Router();

router.post('/add', addEarnings);

export { router as EarningsRoute };
