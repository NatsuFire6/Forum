// controllers/MessageController.js
const Message = require('../models/Message');

module.exports = {
  createMessage: async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;
    try {
      const messageId = await Message.create(senderId, receiverId, content);
      res.status(201).json({ message: 'Message sent', messageId });
    } catch (err) {
      res.status(500).json({ message: 'Error sending message', error: err });
    }
  },

  getMessagesForUser: async (req, res) => {
    const receiverId = req.user.id;
    try {
      const messages = await Message.getByReceiverId(receiverId);
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching messages', error: err });
    }
  }
};
