import NotesPage from "../others/notesPage";
import Header from "../others/Header";
import SideBar from "../others/SideBar";
import NewNotePopUp from "../others/NewNOtePopUp";

import "../main.css";
import { useState } from "react";

export default function Notes({ user }) {
  const [mode, setMode] = useState("all");
  const [include, setInclude] = useState("");
  const [exclude, setExclude] = useState("");
  const [popVisible, setPopVisible] = useState(false);
  const [defaultNotes, setDefaultNotes] = useState([]);

  return (
    <>
      <div className="page-content">
        <div className="main-content">
          <Header user={user} />
          <NotesPage
            user={user}
            mode={mode}
            include={include}
            exclude={exclude}
            defaultNotes={defaultNotes}
            setDefaultNotes={setDefaultNotes}
          />
        </div>
        <div className="side-content">
          <SideBar
            setMode={setMode}
            setExclude={setExclude}
            setInclude={setInclude}
            include={include}
            exclude={exclude}
            setVisible={setPopVisible}
            visible={popVisible}
          />
        </div>
        <NewNotePopUp
          setVisible={setPopVisible}
          setDefaultNotes={setDefaultNotes}
          visible={popVisible}
          user={user}
        />
      </div>
    </>
  );
}
