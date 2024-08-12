import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./appwrite/users";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { IdeaProvider } from "./appwrite/Notes";
import LandingPage from "./pages/LandingPage";
import SingleData from "./components/SingleData";

function App() {
  return (
    <UserProvider>
      <IdeaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </IdeaProvider>
    </UserProvider>
  );
}

export default App;
