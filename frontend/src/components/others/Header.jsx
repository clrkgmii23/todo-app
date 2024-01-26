import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <header>
      <div className="logo"></div>
      <div className="header-user">
        <div>id: {user?.id || "none"}</div>
        <div>name: {user?.username || "no one :("}</div>
      </div>
      <ul className="links">
        <li>
          <Link className="link" to="/">
            Notes
          </Link>
        </li>
        <li>
          <Link className="link" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="link" to="/switch-user">
            Switch&#160;User
          </Link>
        </li>
        <li>
          <Link className="link" to="/create-user">
            Create&#160;user
          </Link>
        </li>
      </ul>
    </header>
  );
}
