import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Cards from "./Components/Dashboard/Cards";
import Details from "./Components/StoreDetails/Details";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import AddStore from "./Components/StoreDetails/AddStore";
import PendingOrders from "./Components/Orders/PendingOrders";
import ViewOrderDetails from "./Components/Orders/ViewOrderDetails";
import DeliveredOrders from "./Components/Orders/DeliveredOrders";

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
          <Route path="/orders/delivered" element={<DeliveredOrders />} />
          <Route path="/orders/pending" element={<PendingOrders />} />
          <Route
            path="/order/details/:orderID"
            element={<ViewOrderDetails />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
