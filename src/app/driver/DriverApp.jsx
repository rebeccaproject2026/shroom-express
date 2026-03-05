import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./pages/layout/Layout";
import PageNotFound from "./pages/pnf/PageNotFound";

// Driver Dashboard Pages
import MyDeliveries from "./pages/deliveries/MyDeliveries";
import DeliveryHistory from "./pages/history/DeliveryHistory";
import Earnings from "./pages/earnings/Earnings";
import Documents from "./pages/documents/Documents";
import Profile from "./pages/profile/Profile";
import Support from "./pages/support/Support";

function DriverApp() {
  return (
    <>
      <Routes>


        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<MyDeliveries />} />
          <Route path="history" element={<DeliveryHistory />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="documents" element={<Documents />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default DriverApp;
