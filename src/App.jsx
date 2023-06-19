import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layouts/Header";
import Login from "./components/Login";
import SourceCodes from "./pages/SourceCodes";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sourceCode" element={<SourceCodes />} />
      </Routes>
    </>
  );
};

export default App;
