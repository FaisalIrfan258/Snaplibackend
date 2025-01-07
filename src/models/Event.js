const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  occasion: { type: String, required: true },
  eventCoverImage: { type: String, required: true },
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  photosPerGuest: { type: Number, required: true },
  numberOfGuests: { type: Number, required: true },
  eventGallery: { type: [String], default: [] },
  qrCode: { type: String },
  shareLink: { type: String },
  createdBy: { type: String, required: true }, // Firebase user ID
  guests: [{ type: String }], // Firebase user IDs of guests
});

module.exports = mongoose.model("Event", EventSchema);
