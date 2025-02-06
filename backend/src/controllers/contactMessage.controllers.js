import ContactMessageModel from "../models/contactMessage.model.js";

// Create a new contact message
export const createMessage = async (req, res) => {
  try {
    const newMessage = await ContactMessageModel.create(req.body);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all messages (for admin)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessageModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
