const Event = require("../models/Event");
const cloudinary = require("../config/cloudinary");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

const createEvent = async (req, res) => {
    try {
      const {
        occasion,
        eventName,
        location,
        startDateTime,
        endDateTime,
        photosPerGuest,
        numberOfGuests,
      } = req.body;
  
      const result = await cloudinary.uploader.upload(req.file.path);
  
      const eventId = uuidv4();
      const shareLink = `${process.env.FRONTEND_URL}/event/${eventId}`;
      const qrCode = await QRCode.toDataURL(shareLink);
  
      const event = new Event({
        occasion,
        eventCoverImage: result.secure_url,
        eventName,
        location,
        startDateTime,
        endDateTime,
        photosPerGuest,
        numberOfGuests,
        qrCode,
        shareLink,
        createdBy: req.user.id,
      });
  
      await event.save();
      res.status(201).json({ success: true, event });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  
  const getEvents = async (req, res) => {
    try {
      const events = await Event.find({
        $or: [{ createdBy: req.user.id }, { guests: req.user.id }],
      });
      res.status(200).json({ success: true, events });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  

  const updateEvent = async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id, createdBy: req.user.id });
  
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      Object.assign(event, req.body);
      await event.save();
      res.status(200).json({ success: true, event });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  

  const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
  
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  

  const joinEvent = async (req, res) => {
    try {
      const event = await Event.findOne({ shareLink: req.body.shareLink });
  
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      if (event.guests.includes(req.user.id)) {
        return res.status(400).json({ success: false, message: "Already joined" });
      }
  
      event.guests.push(req.user.id);
      await event.save();
  
      res.status(200).json({ success: true, message: "Joined event successfully", event });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  



// Add more CRUD functions (read, update, delete) here...

module.exports = { createEvent , joinEvent , deleteEvent , updateEvent , getEvents };
