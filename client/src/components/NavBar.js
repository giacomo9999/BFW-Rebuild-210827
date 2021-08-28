import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <div className="nav-item-group">
          <li>
            <Link to="/">
              <h2>MY GROUP</h2>
            </Link>
          </li>
        </div>
        <div className="nav-item-group">
          <li>
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};
