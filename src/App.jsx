import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminApp from "./app/admin/AdminApp";
import DriverApp from "./app/driver/DriverApp";
import StoreApp from "./app/store/StoreApp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/store/*" element={<StoreApp />} />
                <Route path="/driver/*" element={<DriverApp />} />
                <Route path="/*" element={<AdminApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
