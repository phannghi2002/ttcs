import express from 'express';
import {
    createCodeSeat,
    deleteCodeSeat,
    getAllCodeSeat,
    updateCodeSeat,
    getCodeSeatById,
} from './../controllers/codeSeatController.js';

const router = express.Router();

router.post('/', createCodeSeat);

router.delete('/:id', deleteCodeSeat);

router.get('/', getAllCodeSeat);

router.put('/:id', updateCodeSeat);

router.get('/:id', getCodeSeatById);

export default router;
