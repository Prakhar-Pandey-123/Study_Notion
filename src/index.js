import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import rootReducer from "./reducer";
// creating a store of redux ,store is used to store all states of an application
//store can have only one reducer so we need to combine all the reducers in one reducer 
import { configureStore } from "@reduxjs/toolkit";
import {Toaster} from "react-hot-toast"
const store=configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // whole application is wrapped around the provider so that every application part gets the access of that store through the provider
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster></Toaster>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
