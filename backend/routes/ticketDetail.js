import express from 'express';
import {
    createticketDetail,
    deleteticketDetail,
    getTicketDetailByCodeTicket,
    getAllticketDetail,
    getTicketDetailByFlightNumber,
    getTicketDetailByFlightNumberRoundTrip,
} from './../controllers/ticketDetailController.js';

const router = express.Router();

router.post('/', createticketDetail);

router.delete('/:id', deleteticketDetail);

router.get('/:id', getTicketDetailByCodeTicket);

router.get('/', getAllticketDetail);

router.get('/flightNumber/:id', getTicketDetailByFlightNumber);

router.get('/flightNumberRoundTrip/:id', getTicketDetailByFlightNumberRoundTrip);

export default router;
