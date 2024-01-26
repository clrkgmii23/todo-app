import { useEffect, useState } from "react";
import Notes from "./components/Pages/Notes";
import SwitchUser from "./components/Pages/SwitchUser";
import Profile from "./components/Pages/Profile";

import { Routes, Route } from "react-router-dom";
import CreateUser from "./components/Pages/CreateUser";

export default function App() {
  const [user, setUser] = useState(() => {
    // get the saved user
    const storageUser = localStorage.getItem("user");
    if (storageUser != "undefined") {
      const jsonUser = JSON.parse(storageUser);
      return jsonUser;
    }
    // if no user is saved return id: null
    return { id: null };
  });
  //save the user whenever it chances
  useEffect(() => {
    const storageUser = JSON.stringify(user);
    localStorage.setItem("user", storageUser);
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Notes user={user} />} />
      <Route
        path="/switch-user"
        element={<SwitchUser user={user} setUser={setUser} />}
      />
      <Route
        path="profile"
        element={<Profile user={user} setUser={setUser} />}
      />
      <Route
        path="create-user"
        element={<CreateUser user={user} setUser={setUser} />}
      />
    </Routes>
  );
}
