import mongoose from "mongoose";

const infoBookedSchema = new mongoose.Schema(
  {
    TypeFlight: {
      type: String,
      required: true,
    },
    TypeTicket: {
      type: String,
      required: true,
    },
    AirportFrom: {
      type: String,
      required: true,
    },
    AirportTo: {
      type: String,
      required: true,
    },
    FlightTime: {
      type: Date,
      default: Date("<YYYY-mm-ddTHH:MM>"),
      required: true,
    },
    LandingTime: {
      type: Date,
      default: Date("<YYYY-mm-ddTHH:MM>"),
      required: true,
    },
    DateGo: {
      type: Date,
      default: Date("<YYYY-mm-dd>"),
      required: true,
    },
    DateReturn: {
      type: Date,
      default: Date("<YYYY-mm-dd>"),
    },
    TotalMoney: {
      type: Number,
      required: true,
    },
    CodeTicket: {
      type: String,
      required: true,
      unique: true,
    },
    FlightNumber: {
      type: String,
      required: true,
      // unique: true,
    },
    UserName: {
      type: String,
      required: true,
    },
    ID_Card: {
      type: String,
      required: true,
      unique: true,
    },
    CodeSeat: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
  }
  // { timestamps: Date.getTime() }
);

export default mongoose.model("InfoBooked", infoBookedSchema);

// {
//     "TypeFlight": "OneWay",
//     "TypeTicket" : "Economy Class",
//     "AirportFrom": "HAN",
//     "AirportTo": "SGN",
//     "FlightTime": "2024-01-01 09:30",
//    "LandingTime": "2024-01-01 11:45",
//    "DateGo": "2024-01-01",
//    "TotalMoney": 10000000,
//    "CodeTicket": "HEHAHSF",
//    "FlightNumber":"VNA803",
//    "UserName": "Phan Nghi",
//    "ID_Card": "231361974",
//    "CodeSeat": "5A"
// }
