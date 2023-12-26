import express from 'express';
import {
    createInfoBooked,
    deleteInfoBooked,
    updateInfoBooked,
    getSingleInfoBooked,
    getAllInfoBooked,
    getInfoBookedBySearch,
    getInfoBookedMonthOnewayNow,
    getInfoBookedMonthRoundtripNow,
    getAllInfoBookedOneway,
    getAllInfoBookedRoundtrip,
} from './../controllers/infoBookedController.js';

const router = express.Router();

//create new ticket
router.post('/', createInfoBooked);

//delete new ticket
router.delete('/:id', deleteInfoBooked);

//update new ticket
router.put('/:id', updateInfoBooked);

//get single ticket
router.get('/:id', getSingleInfoBooked);

//get all ticket
router.get('/', getAllInfoBooked);

//get all ticket oneway
router.get('/search/getAllInfoBookedOneway', getAllInfoBookedOneway);

//get all ticket roundtrip
router.get('/search/getAllInfoBookedRoundtrip', getAllInfoBookedRoundtrip);

//get all ticket by search
router.get('/search/getInfoBookedBySearch', getInfoBookedBySearch);

//get all ticket oneway month now
router.get('/search/getInfoBookedOnewayMonthNow', getInfoBookedMonthOnewayNow);

//get all ticket roundtrip month now
router.get('/search/getInfoBookedRoundtripMonthNow', getInfoBookedMonthRoundtripNow);

export default router;
