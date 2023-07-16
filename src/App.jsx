import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layouts/Header";
import SourceCodes from "./pages/SourceCodes";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import IndividualSource from "./pages/IndividualSource";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sourceCode" element={<SourceCodes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/individual/:id" element={<IndividualSource />} />
      </Routes>
    </>
  );
};

export default App;
