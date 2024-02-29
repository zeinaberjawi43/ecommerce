const Joi = require("joi");
const Event = require("../models/events");

// Joi validation schema for creating or updating an event
const eventValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  eventDate: Joi.date().required().min("now").messages({
    "date.min": "Events date must be a valid date in the future",
  }),
});

const validateEvent = async (req, res, next) => {
  const { error } = eventValidationSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }

  const eventId = req.params.id;

  // Check if the event name already exists
  try {
    const existingEvent = await Event.findOne({ name: req.body.name });

    // If updating and the name exists for a different event, return an error
    if (existingEvent && existingEvent._id.toString() !== eventId) {
      return res
        .status(400)
        .json({ error: "Event with the same name already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  // If all validations pass, move on to the next middleware or controller
  next();
};

module.exports = {
  validateEvent,
};

// !ggggggggggggggg
// const Event = require("../models/events");

// const validateEvent = async (req, res, next) => {
//   const { name, description, eventDate } = req.body;
//   const eventId = req.params.id; // Retrieve the event ID from the request parameters

//   // Check if required fields are provided
//   if (!name || !description || !eventDate) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   // Validate eventDate to be a valid date in the future
//   const currentDate = new Date();
//   const inputDate = new Date(eventDate);

//   if (isNaN(inputDate) || inputDate <= currentDate) {
//     return res
//       .status(400)
//       .json({ error: "Events date must be a valid date in the future" });
//   }

//   // Check if the event name already exists
//   try {
//     const existingEvent = await Event.findOne({ name });

//     // If updating and the name exists for a different event, return an error
//     if (existingEvent && existingEvent._id.toString() !== eventId) {
//       return res
//         .status(400)
//         .json({ error: "Event with the same name already exists" });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   // If all validations pass, move on to the next middleware or controller
//   next();
// };

// module.exports = {
//   validateEvent,
// };
