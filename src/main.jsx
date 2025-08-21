import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import GenrePage from "./pages/GenrePage";
import DetailPage from "./components/DetailPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>} />
    <Route path="/genre/:genreId" element={<GenrePage/>} />
    <Route path="/movie/:id" element={<DetailPage />} />
  </Routes>
  </BrowserRouter>
)

