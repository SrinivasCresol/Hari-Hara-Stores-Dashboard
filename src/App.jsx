import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Cards from "./Components/Dashboard/Cards";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Cards />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
