import mongoose from 'mongoose';

const cancelSchema = new mongoose.Schema({
    Customer: {
        type: String,
        require: true,
    },
    TypeFlight: {
        type: String,
        require: true,
    },
    CodeTicket: {
        type: String,
        require: true,
    },

    Phone: {
        type: String,
    },

    Email: {
        type: String,
    },
    ID_Info: {
        type: String,
        require: true,
        unique: true,
    },
    ID_Ticket: {
        type: String,
        require: true,
        unique: true,
    },
    Company: {
        type: String,
        require: true,
    },
    TypeTicket: {
        type: String,
        require: true,
    },
    CodeSeatCancel: {
        type: String,
        require: true,
    },
    FlightNumber: {
        type: String,
        require: true,
    },
});

export default mongoose.model('Cancel', cancelSchema);
