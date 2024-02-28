const express = require("express");
const router = express.Router();
const notesController = require("../controllers/note.controller.js");

router.post("/create", notesController.createNote);
router.get("/getall", notesController.getAllNotes);
router.get("/getbyid/:id", notesController.getNoteById);
router.put("/update/:id", notesController.updateNoteById);
router.delete("/delete/:id", notesController.deleteNoteById);

module.exports = router;
