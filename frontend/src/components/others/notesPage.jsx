import { useEffect, useState } from "react";
import Note from "./Note";

export default function NotesPage({
  mode,
  include,
  exclude,
  defaultNotes,
  setDefaultNotes,
  user,
}) {
  //notes from the server
  // the notes showing
  const [notes, setNotes] = useState(defaultNotes);
  const [littleFace, setLittleFace] = useState("( ╹ -╹)?");
  const api_url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    async function getData() {
      const response = await fetch(api_url + `/users/${user?.id}/notes`);
      const jsonResponse = await response.json();
      setDefaultNotes(jsonResponse.data);
    }
    getData();
  }, []);
  useEffect(() => {
    setNotes(() => {
      return defaultNotes
        .filter((value) => {
          return (
            value.content.includes(include) &&
            (!value.content.includes(exclude) || exclude === "")
          );
        })
        .filter((value) => {
          if (mode === "all") return true;
          if (mode === "only completed") return value.completed;
          else return !value.completed;
        });
    });
  }, [include, exclude, mode, defaultNotes]);

  async function deleteNote(id) {
    //delete in browser
    setDefaultNotes((dnotes) => {
      return dnotes.filter((dnotes) => dnotes.id != id);
    });
    //delete from server
    const response = await fetch(api_url + "/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.data.success) {
      if (jsonResponse.error) throw jsonResponse.error;
    }
  }
  async function doneNote(id) {
    //update in the page
    setDefaultNotes((dnotes) => {
      return dnotes.map((value) => {
        if (value.id === id) {
          return { ...value, completed: !value.completed };
        }
        return value;
      });
    });
    //update in the server
    const theNote = defaultNotes.find((value) => value.id === id);
    const response = await fetch(api_url + "/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        column: "completed",
        value: !theNote.completed,
      }),
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.data.success) {
      if (jsonResponse.error) throw jsonResponse.error;
    }
  }
  return (
    <div className="notes-page">
      {notes.length !== 0 ? (
        notes.map((value) => {
          return (
            <div className="notes" key={value.id}>
              <Note
                onDelete={deleteNote}
                onDone={doneNote}
                content={value.content}
                completed={value.completed}
                include={include}
                id={value.id}
                dateCreated={value.date_created}
              />
            </div>
          );
        })
      ) : (
        <div className="nothing">
          nothing &#160;
          <div
            className="little-face"
            onMouseDown={() => setLittleFace("(• ᴖ •｡)")}
            onMouseUp={() => setLittleFace("( ╹ -╹)?")}
          >
            {littleFace}
          </div>
        </div>
      )}
    </div>
  );
}
