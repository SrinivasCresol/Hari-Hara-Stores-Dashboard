import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Cards from "./Components/Dashboard/Cards";
import Details from "./Components/StoreDetails/Details";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import AddStore from "./Components/StoreDetails/AddStore";
import DeclinedOrders from "./Components/Orders/DeclinedOrders";
import AcceptedOrders from "./Components/Orders/AcceptedOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Cards />} />
          <Route path="/details" element={<Details />} />
          <Route path="/add/store" element={<AddStore />} />
          <Route path="/orders/accepted" element={<AcceptedOrders />} />
          <Route path="/orders/declined" element={<DeclinedOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
