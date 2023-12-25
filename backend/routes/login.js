import express from 'express';
import { getAllAccounts } from '../controllers/loginController.js';

const router = express.Router();

router.get('/', getAllAccounts);

export default router;
