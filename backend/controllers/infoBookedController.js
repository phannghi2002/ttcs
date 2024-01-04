import InfoBooked from '../models/infoBooked.js';
import moment from 'moment';

//Create infoBooked

export const createInfoBooked = async (req, res) => {
    const newInfoBooked = new InfoBooked(req.body);
    console.log('vai ca chu bin');
    try {
        const saveInfoBooked = await newInfoBooked.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveInfoBooked,
        });
    } catch (error) {
        console.log('lỗi', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
    }
};

//update ticket

export const updateInfoBooked = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedInfoBooked = await InfoBooked.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedInfoBooked,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};

//delete ticket

export const deleteInfoBooked = async (req, res) => {
    const id = req.params.id;
    try {
        await InfoBooked.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};

//getSingle ticket

export const getSingleInfoBooked = async (req, res) => {
    const id = req.params.id;
    try {
        const infoBooked = await InfoBooked.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: infoBooked,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllInfoBooked = async (req, res) => {
    //for pagination
    // const page = parseInt(req.query.page);
    // console.log(page);

    console.log('cay vai ca biu');

    try {
        const infoBooked = await InfoBooked.find({});
        //     .skip(page * 5)
        //     .limit(5);

        if (infoBooked.length > 0) {
            console.log('ao that day');
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
            });
        } else {
            throw new Error('No tickets found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket Oneway

export const getAllInfoBookedOneway = async (req, res) => {
    //for pagination
    // const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    try {
        const infoBooked = await InfoBooked.find({
            // TypeFlight: 'Oneway',
        });

        console.log('day nhe con vo', infoBooked);

        if (infoBooked.length > 0) {
            console.log('ao that day');
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
            });
        } else {
            throw new Error('No tickets found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket Roundtrip

export const getAllInfoBookedRoundtrip = async (req, res) => {
    //for pagination
    const TypeFlight = new RegExp(req.query.TypeFlight, 'i');
    // const TypeFlight = new RegExp(req.query.TypeFlight, 'i');
    console.log('dit ca lo nha may');

    try {
        const infoBooked = await InfoBooked.find({
            // TypeFlight: 'Roundtrip',
            TypeFlight: { $eq: 'Roundtrip' },
        });
        //     .skip(page * 5)
        //     .limit(5);

        if (infoBooked.length > 0) {
            console.log('ao that day');
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
            });
        } else {
            throw new Error('No tickets found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//get ticket by search
export const getInfoBookedBySearch = async (req, res) => {
    //here 'i' means case sensitive

    // const codeTicket = new RegExp(req.query.CodeTicket);
    // const CodeTicket = new RegExp(req.query);

    const codeTicket = new RegExp(`^${req.query.CodeTicket}$`);

    try {
        const InfoBookeds = await InfoBooked.find({
            // CodeTicket: { $eq: CodeTicket },
            CodeTicket: codeTicket,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found booked',
        });
    }
};

const getMonth = () => {
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setMonth(currentMonthStart.getMonth() + 0, 0);
    currentMonthStart.setHours(0, 0, 0, 0);
    console.log(currentMonthStart);

    const currentMonthEnd = new Date();
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);
    console.log(currentMonthEnd);

    return {
        currentMonthStart: currentMonthStart,
        currentMonthEnd: currentMonthEnd,
    };
};
export const getInfoBookedMonthOnewayNow = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);
    const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    const currentMonthStart = getMonth().currentMonthStart;
    const currentMonthEnd = getMonth().currentMonthEnd;

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentMonthEnd },
            TypeFlight: { $eq: 'Oneway' },
        });

        // console.log(InfoBookeds);

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getInfoBookedMonthRoundtripNow = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);
    const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    const currentMonthStart = getMonth().currentMonthStart;
    const currentMonthEnd = getMonth().currentMonthEnd;

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentMonthEnd },
            TypeFlight: { $eq: 'Roundtrip' },
        });

        // console.log(InfoBookeds);

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};
