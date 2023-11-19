import express from "express";
import {
  createTicket,
  deleteTicket,
  updateTicket,
  getSingleTicket,
  getAllTicket,
  getTicketBySearch,
} from "./../controllers/ticketController.js";

const router = express.Router();

//create new ticket
router.post("/", createTicket);

//delete new ticket
router.delete("/:id", deleteTicket);

//update new ticket
router.put("/:id", updateTicket);

//get single ticket
router.get("/:id", getSingleTicket);

//get all ticket
router.get("/", getAllTicket);

//get all ticket by search
router.get("/search/getTicketBySearch", getTicketBySearch);

export default router;
