import { Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const emptyFormState = { name: "", email: "", password: "", password2: "" };
  const [formState = emptyFormState, setFormState] = useState();

  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log("New Form State: ", formState);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    };

    console.log("User Data: ", userData);
    setFormState(emptyFormState);
  };

  return (
    <div className="container-inner">
      <h2>Login</h2>
      <form className="h-form" onSubmit={onSubmit}>
        <label className="h-label">Name</label>
        <input
          className="h-input"
          type="text"
          name="name"
          value={formState.name}
          onChange={onChange}
        />
        <label className="h-label">E-Mail</label>
        <input
          className="h-input"
          type="text"
          name="email"
          value={formState.email}
          onChange={onChange}
        />
        <label className="h-label">Password</label>
        <input
          className="h-input"
          type="password"
          name="password"
          value={formState.password}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
      <h3>Don't have an account?</h3>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};
