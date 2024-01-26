import Header from "../others/Header";
import { useNavigate } from "react-router-dom";

export default function CreateUser({ user, setUser }) {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  return (
    <>
      <Header user={user} />
      <div className="create-page">
        <form
          className="create-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const jsonData = {};
            formData.forEach((value, key) => {
              jsonData[key] = value;
            });
            const response = await fetch(`${url}/users/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            });
            const jsonRresponse = await response.json();
            const newUser = {
              username: jsonData.username,
              password: jsonData.password,
              id: jsonRresponse.data["affected rows"],
            };
            setUser(newUser);
            navigate("/");
          }}
        >
          <h2>Create A New User!</h2>
          <input
            className="create-input create-username"
            type="text"
            placeholder="username"
            name="username"
            required
            autoFocus
          />
          <input
            className="create-input create-password"
            type="text"
            required
            name="password"
            placeholder="password"
          />
          <button className="create-btn">Submit</button>
        </form>
      </div>
    </>
  );
}
