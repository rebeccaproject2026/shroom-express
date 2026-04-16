import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./pages/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import AllStores from "./pages/stores/allstores/AllStores";
import AddStore from "./pages/stores/allstores/addstore";
import StoreDetails from "./pages/stores/allstores/details";
import InventoryList from "./pages/stores/inventory/InventoryList";
import AddInventory from "./pages/stores/inventory/addinventory";
import InventoryDetails from "./pages/stores/inventory/details";
import Suppliers from "./pages/stores/suppliers/Suppliers";
import AddSupplier from "./pages/stores/suppliers/addsupplier";
import SupplierDetails from "./pages/stores/suppliers/details";
import AllOrders from "./pages/ordersAndDeliveries/orders/AllOrders";
import NewOrder from "./pages/ordersAndDeliveries/orders/NewOrder";
import OrderDetails from "./pages/ordersAndDeliveries/orders/OrderDetails";
import LiveTracking from "./pages/ordersAndDeliveries/tracking/LiveTracking";
import DeliveryZones from "./pages/ordersAndDeliveries/zones/DeliveryZones";
import OrderReports from "./pages/ordersAndDeliveries/reports/OrderReports";
import Customers from "./pages/customers/Customers";
import CustomerDetails from "./pages/customers/details";

import "./index.css";

function SuperAdminApp() {
  return (
    <div className="superadmin-root min-h-screen">
      <Routes>
        <Route index element={<Navigate to="/superadmin/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stores/all" element={<AllStores />} />
          <Route path="stores/add" element={<AddStore />} />
          <Route path="stores/details/:id" element={<StoreDetails />} />
          <Route path="inventory/all" element={<InventoryList />} />
          <Route path="inventory/add" element={<AddInventory />} />
          <Route path="inventory/details/:id" element={<InventoryDetails />} />
          <Route path="suppliers/all" element={<Suppliers />} />
          <Route path="suppliers/add" element={<AddSupplier />} />
          <Route path="suppliers/details/:id" element={<SupplierDetails />} />
          <Route path="orders/all" element={<AllOrders />} />
          <Route path="orders/add" element={<NewOrder />} />
          <Route path="orders/details/:id" element={<OrderDetails />} />
          <Route path="orders/livetracking" element={<LiveTracking />} />
          <Route path="orders/deliveryzones" element={<DeliveryZones />} />
          <Route path="orders/orderreports" element={<OrderReports />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/details/:id" element={<CustomerDetails />} />
        </Route>


        <Route path="*" element={<Navigate to="/superadmin/login" replace />} />
      </Routes>
    </div>
  );
}

export default SuperAdminApp;
