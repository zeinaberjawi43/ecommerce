const Event = require("../models/events");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { name, description, eventDate } = req.body;

    const event = new Event({
      name,
      description,
      eventDate,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update event by ID
const updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, eventDate } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { name, description, eventDate },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete event by ID
const deleteEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
