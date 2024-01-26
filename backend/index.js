const express = require("express");
const cors = require("cors");
//data
const users = require("./routes/users");
const notes = require("./routes/notes");

const app = express();
const PORT = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("api so cool");
});

app.use("/users", users);
app.use("/notes", notes);

app.listen(PORT, () => console.log("listening on http://127.0.0.1:" + PORT));
