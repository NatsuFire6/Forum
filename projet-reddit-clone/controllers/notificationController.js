// controllers/NotificationController.js
const Notification = require('../models/Notification');

module.exports = {
  createNotification: async (req, res) => {
    const { userId, content } = req.body;
    try {
      const notificationId = await Notification.create(userId, content);
      res.status(201).json({ message: 'Notification sent', notificationId });
    } catch (err) {
      res.status(500).json({ message: 'Error sending notification', error: err });
    }
  },

  getNotificationsForUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const notifications = await Notification.getByUserId(userId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching notifications', error: err });
    }
  }
};
