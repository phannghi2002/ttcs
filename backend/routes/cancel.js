import express from 'express';
import { getAllCancel, getCancel, createCancel, deleteCancel, notifyCompany } from '../controllers/cancelController.js';

const router = express.Router();

router.get('/', getAllCancel);

router.get('/getCancel', getCancel);

router.post('/', createCancel);

router.delete('/:id', deleteCancel);

router.get('/notifyCompany', notifyCompany);

export default router;
