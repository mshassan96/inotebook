const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const validationAddNote = [
  body("title", "Enter a valid title").isLength({ min: 5 }),
  body(
    "description",
    "Enter a valid description with atleast 10 characters."
  ).isLength({ min: 10 }),
];

const addNote = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, tag } = req.body;
    const note = await Note.create({
      title,
      description,
      tag,
      user: req.user.id,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const updateNote = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  try {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Get note to be updated and update
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Record Not Found");

    if (note.user.toString() !== req.user.id)
      res.status(401).send("Not Allowed");

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports = { getAllNotes, addNote, updateNote, validationAddNote };
