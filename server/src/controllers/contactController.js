import { ContactMessage } from "../models/ContactMessage.js";

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email and message are required." });
    }

    const created = await ContactMessage.create({ name, email, message });
    return res.status(201).json({
      message: "Message received.",
      id: created._id
    });
  } catch (error) {
    next(error);
  }
};
