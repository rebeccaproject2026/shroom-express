import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/admin/redux/store";
import "./app/admin/index.css"; // We'll keep the admin styles as global for now since there's no root index.css

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
