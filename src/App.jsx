import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Insta from "./Insta";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/insta" element={<Insta />} />
    </Routes>
  );
}

export default App;
