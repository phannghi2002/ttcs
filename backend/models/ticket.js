import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    FlightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    AirlineCode: {
      type: String,
      required: true,
    },
    Duration: {
      type: Number,
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
    DateGo: {
      type: Date,
      default: Date("<YYYY-mm-dd>"),

      required: true,
    },
    Oneway: {
      BusinessClass: {
        PriceAdult: {
          type: Number,
          required: true,
        },
        PriceChildren: {
          type: Number,
          required: true,
        },
      },
      EconomyClass: {
        PriceAdult: {
          type: Number,
          required: true,
        },
        PriceChildren: {
          type: Number,
          required: true,
        },
      },
    },
    Roundtrip: {
      DateReturn: {
        type: Date,
        default: Date("<YYYY-mm-dd>"),
        required: true,
      },
      BusinessClass: {
        PriceAdult: {
          type: Number,
          required: true,
        },
        PriceChildren: {
          type: Number,
          required: true,
        },
      },
      EconomyClass: {
        PriceAdult: {
          type: Number,
          required: true,
        },
        PriceChildren: {
          type: Number,
          required: true,
        },
      },
    },
  }
  // { timestamps: date.getTime() }
);

export default mongoose.model("Ticket", ticketSchema);
