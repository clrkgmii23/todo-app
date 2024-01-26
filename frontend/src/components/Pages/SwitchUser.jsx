import Header from "../others/Header";
import { useNavigate } from "react-router-dom";

export default function SwitchUser({ user, setUser }) {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  return (
    <div className="user-switch-page">
      <Header user={user} />
      <div className="user-switch">
        <div className="you">
          you are currently:{" "}
          <span className="selectable">{user?.username || "NO ONE!!"}</span>
        </div>
        <h2 className="user-switch-header">Change User</h2>
        <form
          className="user-switch-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const jsonData = {};
            formData.forEach((value, key) => {
              jsonData[key] = value;
            });
            if (jsonData.id == 0) {
              setUser(null);
              return;
            }
            const response = await fetch(url + "/users/" + jsonData.id);
            const JsonResponse = await response.json();
            if (Object.keys(JsonResponse).length != 0) {
              setUser(JsonResponse.data);
              navigate("/");
            }
          }}
        >
          <input
            className="switch-input"
            placeholder="id"
            type="number"
            maxLength="0"
            required
            name="id"
            autoFocus
          />
          <button className="btn switch-btn" type="submit">
            Switch
          </button>
        </form>
      </div>
    </div>
  );
}
