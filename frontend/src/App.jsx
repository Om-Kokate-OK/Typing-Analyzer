import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return authMode === "login" ? (
      <Login switchMode={() => setAuthMode("register")} />
    ) : (
      <Register switchMode={() => setAuthMode("login")} />
    );
  }

  return <Dashboard />;
}

export default App;
