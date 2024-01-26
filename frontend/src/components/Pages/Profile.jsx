import Header from "../others/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const url = import.meta.env.VITE_API_URL;
  const [changeVis, setChangeVis] = useState(false);
  const [deleteVis, setDeleteVis] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Header user={user} />
      <div className="profile-page">
        <div className="user-id">
          id: <span className="user-special">{user?.id || "0"}</span>
        </div>
        <div className="user-and-pass">
          <div className="username">
            <span>username: </span>
            <span className="user-special">{user?.username || "none"}</span>
          </div>
          <div className="user-password ">
            <span className="">password: &nbsp;</span>
            <span className="user-special">
              {user?.password || "no password"}
            </span>
          </div>
        </div>
        <span
          className="username-update"
          onClick={() => {
            setChangeVis(true);
          }}
        >
          change
        </span>
        <button
          className="delete-user-btn"
          onClick={() => {
            setDeleteVis(true);
          }}
        >
          delete
        </button>
      </div>
      <div
        className={
          changeVis || deleteVis ? "invisibles" : "invisibles cant-see"
        }
        onClick={(e) => {
          if (e.target == e.currentTarget) {
            setChangeVis(false);
            setDeleteVis(false);
          }
        }}
      >
        <div
          className={deleteVis ? "delete-account" : "delete-account cant-see"}
        >
          <div className="warning">are you really sure?</div>
          <button
            className="btn delete-confirm"
            onClick={async (e) => {
              fetch(`${url}/users/${user.id}`, {
                method: "DELETE",
              });
              setUser(undefined);
              navigate("/switch-user");
            }}
          >
            Yes
          </button>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (user == undefined) {
              setChangeVis(false);
              navigate("/switch-user");
              return;
            }
            //send to server
            const data = new FormData(e.target);
            const jsonData = {};
            data.forEach((value, key) => {
              jsonData[key] = value;
            });
            const column = jsonData.column;
            setUser({ ...user, [column]: jsonData.value });
            setChangeVis(false);
            e.target.reset();
            await fetch(`${url}/users/${user.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            });
          }}
          className={changeVis ? "update-account" : "update-account cant-see"}
        >
          <div className="radio-group">
            <label className="lab" htmlFor="username">
              username
            </label>
            <input
              className="radio"
              type="radio"
              name="column"
              value="username"
              defaultChecked
            />
          </div>
          <div className="radio-group">
            <label className="lab" htmlFor="username">
              password
            </label>
            <input
              className="radio"
              type="radio"
              name="column"
              value="password"
            />
          </div>
          <input
            required
            name="value"
            className="update-value"
            type="text"
            placeholder="value"
          />
          <button className="btn update-btn">update</button>
        </form>
      </div>
    </>
  );
}
