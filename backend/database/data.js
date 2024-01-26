const mysql = require("mysql2/promise");
require("dotenv").config();

function handleError(err) {
  console.error("ooopsie: " + error);
  throw error;
}

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

// users functions
async function getAllUsers() {
  try {
    const [results] = await conn.query("select * from users");
    return results;
  } catch (error) {
    handleError(err);
  }
}
async function getUser(column = "id", value) {
  try {
    const [results] = await conn.query("select * from users where ?? = ?", [
      column,
      value,
    ]);
    return results[0];
  } catch (error) {
    handleError(err);
  }
}
async function createUser(username, password) {
  try {
    const [results] = await conn.query(
      "INSERT INTO users(username, password) VALUES (?, ?)",
      [username, password]
    );
    return {
      "affected rows": results.insertId,
      success: true,
    };
  } catch (error) {
    handleError(err);
  }
}
async function updateUser(id, column, value) {
  try {
    const [results] = await conn.query("UPDATE users SET ??=? WHERE id = ?", [
      column,
      value,
      id,
    ]);
    return { "affected rows": results.affectedRows, success: true };
  } catch (error) {
    handleError(err);
  }
}
async function deleteUser(id) {
  try {
    // delete the notes assosiated with the this user
    await conn.query("DELETE FROM notes where user_id = ?", [id]);
    // delete the user
    const [results] = await conn.query("DELETE FROM users where id = ?", [id]);
    return { "affected rows": results.affectedRows, success: true };
  } catch (error) {
    handleError(err);
  }
}
//notes functions
async function getAllNotes() {
  try {
    const [results] = await conn.query("SELECT * FROM notes");
    return results;
  } catch (error) {
    handleError(err);
  }
}
async function getNote(id) {
  try {
    const [results] = await conn.query("SELECT * FROM notes WHERE id=?", [id]);
    return results[0];
  } catch (error) {
    handleError(err);
  }
}
async function getUserNotes(user_id) {
  try {
    const [results] = await conn.query("SELECT * FROM notes WHERE user_id=?", [
      user_id,
    ]);
    return results;
  } catch (error) {
    handleError(err);
  }
}
async function createNote(user_id, content) {
  try {
    if (content.length == 0) throw new Error("pls no blank notes!!");
    const [results] = await conn.query(
      "INSERT INTO notes (user_id, content) VALUES (?,?)",
      [user_id, content]
    );
    const newNote = await getNote(results.insertId);
    return {
      "affected rows": results.affectedRows,
      success: true,
      noteId: results.insertId,
      newNote: newNote,
    };
  } catch (error) {
    handleError(err);
  }
}
async function updateNote(id, column, value) {
  try {
    const [results] = await conn.query("UPDATE notes SET ?? = ? WHERE id = ?", [
      column,
      value,
      id,
    ]);
    return { "affected rows": results.affectedRows, success: true };
  } catch (error) {
    handleError(err);
  }
}

async function deleteNote(id) {
  try {
    const [results] = await conn.query("DELETE FROM notes WHERE id=?", [id]);
    return { "affected rows": results.affectedRows, success: true };
  } catch (error) {
    handleError(err);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createNote,
  getAllNotes,
  getUserNotes,
  getNote,
  updateNote,
  deleteNote,
};
