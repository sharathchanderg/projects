const Note = require("../models/note.model");

// Controllers
// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const newNote = await Note.create({ title, content });
    res
      .status(201)
      .json({ message: "Created note successfully", data: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  Read all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json({ message: "Success", notes });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve a single note using its id
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error retrieving note by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing note
exports.updateNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await Note.update({ title, content }, { where: { id } });
    const updatedNote = await Note.findByPk(id);
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error updating note by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an existing note
exports.deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await Note.destroy({ where: { id } });
    res.status(200).json({ message: "Note deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting note by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
