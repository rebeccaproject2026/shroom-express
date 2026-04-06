import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./pages/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import AllStores from "./pages/stores/AllStores";
import AddStore from "./pages/stores/addstore";
import StoreDetails from "./pages/stores/details";
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
        </Route>
        <Route path="*" element={<Navigate to="/superadmin/login" replace />} />
      </Routes>
    </div>
  );
}

export default SuperAdminApp;
