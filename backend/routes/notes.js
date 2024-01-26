const express = require("express");
const database = require("../database/data");
const notes = express.Router();

function handleError(err, res) {
  res.status(500).send({ error: err });
}

notes
  .route("/")
  .get(async (req, res) => {
    const response = await database.getAllNotes();
    res.json({ data: response });
  })
  .post(async (req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    try {
      const response = await database.createNote(id, content);
      res.json({ data: response });
    } catch (err) {
      handleError(err, res);
    }
  })
  .put(async (req, res) => {
    const id = req.body.id;
    const column = req.body.column;
    const value = req.body.value;
    try {
      const response = await database.updateNote(id, column, value);
      res.json({ data: response });
    } catch (err) {
      handleError(err, res);
    }
  })
  .delete(async (req, res) => {
    const id = req.body.id;
    try {
      const response = await database.deleteNote(id);
      res.json({ data: response });
    } catch (err) {
      handleError(err, res);
    }
  });
notes.get("/:id", async (req, res) => {
  const response = await database.getNote(req.params.id);
  res.json({ data: { ...response } });
});

module.exports = notes;
