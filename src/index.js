import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigation from "./Components/Navigation";
import Form from "./Components/Form";
import MainPage from "./Components/MainPage";
import reportWebVitals from "./reportWebVitals";
import { MarkersProvider } from "./Components/MarkersContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MarkersProvider>
      <MainPage />
      {/* <Navigation />
    <Form /> */}
    </MarkersProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
