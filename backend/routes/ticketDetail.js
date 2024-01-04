import express from 'express';
import {
    createticketDetail,
    deleteticketDetail,
    getTicketDetailByCodeTicket,
    getAllticketDetail,
} from './../controllers/ticketDetailController.js';

const router = express.Router();

router.post('/', createticketDetail);

router.delete('/:id', deleteticketDetail);

router.get('/:id', getTicketDetailByCodeTicket);

router.get('/', getAllticketDetail);

export default router;
