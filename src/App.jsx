import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Cards from "./Components/Dashboard/Cards";
import Details from "./Components/StoreDetails/Details";
import ForgotPassword from "./Components/Auth/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/details" element={<Details />} />

          <Route path="/dashboard" element={<Cards />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
