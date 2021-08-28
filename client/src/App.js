import { BrowserRouter, Route } from "react-router-dom";

import { NavBar } from "./components/layout/NavBar";
import { Register } from "./components/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Register />
      </div>
    </BrowserRouter>
  );
}

export default App;
