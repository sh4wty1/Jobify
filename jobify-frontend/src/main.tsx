import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./global.css";
import { ToastProvider } from "./components/layout/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastProvider />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);