import express from 'express';
import {
    createTicket,
    deleteTicket,
    updateTicket,
    getSingleTicket,
    getAllTicket,
    getTicketBySearch,
    getTicketBySearchCompany,
    getTicketBySearchDuration,
    getTicketBySearchCompanyAndDuration,
    getTicketByToday,
    getTicketCompletedAll,
    getTicketIncompletedAll,
    getTicketCompletedMonthNow,
    getTicketIncompletedMonthNow,
} from './../controllers/ticketController.js';

const router = express.Router();

//create new ticket
router.post('/', createTicket);

//delete new ticket
router.delete('/:id', deleteTicket);

//update new ticket
router.put('/:id', updateTicket);

router.patch('/:id', updateTicket);

//get single ticket
router.get('/:id', getSingleTicket);

//get all ticket
router.get('/', getAllTicket);

//get all ticket by search
router.get('/search/getTicketBySearch', getTicketBySearch);

//get all ticket by search company
router.get('/search/getTicketBySearchCompany', getTicketBySearchCompany);

//get all ticket by search duration
router.get('/search/getTicketBySearchDuration', getTicketBySearchDuration);

//get all ticket by search company and duration
router.get('/search/getTicketBySearchCompanyAndDuration', getTicketBySearchCompanyAndDuration);

//get all ticket by today
router.get('/search/getTicketByToday', getTicketByToday);

//get all ticket completed
router.get('/search/getTicketCompletedAll', getTicketCompletedAll);

//get all ticket incompleted
router.get('/search/getTicketIncompletedAll', getTicketIncompletedAll);

//get all ticket completed in month now
router.get('/search/getTicketCompletedMonthNow', getTicketCompletedMonthNow);

//get all ticket incompleted in month now
router.get('/search/getTicketIncompletedMonthNow', getTicketIncompletedMonthNow);

export default router;
