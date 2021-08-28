import { BrowserRouter, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
