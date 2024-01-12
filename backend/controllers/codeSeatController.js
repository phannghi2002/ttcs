import { query } from 'express';
import CodeSeat from '../models/codeSeat.js';
import moment from 'moment';

//Create CodeSeat

export const createCodeSeat = async (req, res) => {
    const newCodeSeat = new CodeSeat(req.body);
    try {
        const saveCodeSeat = await newCodeSeat.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveCodeSeat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
    }
};

//update ticket

export const updateCodeSeat = async (req, res) => {
    const id = req.params.id;
    console.log(typeof req.query.seat);
    const type = req.query.type;
    const codeSeat = req.query.seat.split(',');

    try {
        const updatedCodeSeat = await CodeSeat.updateOne(
            { FlightNumber: id },
            {
                $set: { [type]: codeSeat },
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedCodeSeat,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};

//delete ticket

export const deleteCodeSeat = async (req, res) => {
    const id = req.params.id;
    try {
        await CodeSeat.findByIdAndDelete(id);

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

export const getCodeSeatById = async (req, res) => {
    const id = req.params.id;
    try {
        const CodeSeatSearch = await CodeSeat.findOne({ FlightNumber: id });
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: CodeSeatSearch,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketDetailByFlightNumber = async (req, res) => {
    const id = req.params.id;
    try {
        const CodeSeatSearch = await CodeSeat.find({ FlightNumber: id }, { ID_Card: 1 });

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: CodeSeatSearch,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketDetailByFlightNumberRoundTrip = async (req, res) => {
    const id = req.params.id;
    const returnFlight = req.query.roundTrip;
    try {
        const CodeSeatSearch = await CodeSeat.find(
            {
                $or: [
                    { FlightNumber: id },
                    { FlightNumber: returnFlight },
                    { FlightNumberReturn: id, TypeFlight: 'Roundtrip' },
                    { FlightNumberReturn: returnFlight, TypeFlight: 'Roundtrip' },
                ],
            },
            { ID_Card: 1 },
        );

        console.log(req.query);
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: CodeSeatSearch,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllCodeSeat = async (req, res) => {
    try {
        const CodeSeat = await CodeSeat.find({});

        if (CodeSeat.length > 0) {
            res.status(200).json({
                success: true,
                count: CodeSeat.length,
                message: 'Successfully',
                data: CodeSeat,
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
