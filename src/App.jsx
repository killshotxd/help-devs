import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layouts/Header";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
