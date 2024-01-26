const express = require("express");
const database = require("../database/data");

function handleError(err, res) {
  res.status(500).send({ error: err });
}

const users = express.Router();

// returns all the users
users
  .route("/")
  .get(async (req, res) => {
    const response = await database.getAllUsers();
    res.json({ data: response });
  })
  .post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
      const response = await database.createUser(username, password);
      res.json({ data: response });
    } catch (err) {
      handleError(err, res);
    }
  });
users
  .route("/:id")
  .get(async (req, res) => {
    const response = await database.getUser("id", req.params.id);
    res.json({ data: response });
  })
  .put(async (req, res) => {
    {
      const id = req.params.id;
      const column = req.body.column;
      const value = req.body.value;
      try {
        const response = await database.updateUser(id, column, value);
        res.json({ data: response });
      } catch (err) {
        handleError(err, res);
      }
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    try {
      const response = await database.deleteUser(id);
      res.json({ data: response });
    } catch (err) {
      handleError(err, res);
    }
  });
// returns all the notes from a single user
users.get("/:id/notes", async (req, res) => {
  const id = req.params.id;
  const response = await database.getUserNotes(id);
  res.json({ data: response });
});
// returns a note from a user using it's id
users.get("/:id/:note_id", async (req, res) => {
  const id = req.params.id;
  const note_id = req.params.note_id;
  const response = await database.getUserNotes(id);
  const note = response[note_id - 1];
  if (note) res.json({ data: note });
  else res.send("NULL");
});

module.exports = users;
