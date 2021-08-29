import { BrowserRouter, Route } from "react-router-dom";

import { NavBar } from "./components/layout/NavBar";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { HomePage } from "./components/layout/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </BrowserRouter>
  );
}

export default App;
