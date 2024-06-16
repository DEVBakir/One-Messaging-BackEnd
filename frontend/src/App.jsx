import { Route, Routes } from "react-router-dom";
import QRCodeScanner from "./pages/QRCodeScanner";
import SendMessage from "./pages/SendMessage";
import "./App.css";
import supabase from "./config/SupabaseClient";
import EntryPoint from "./pages/EntryPoint";
import Navbar from "./components/NavBar";
import { useUser } from "./context/UserContext";
import { useState } from "react";

function App() {
  const { user, signin } = useUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handlelogin =async (event) => {
    event.preventDefault();
    await signin(email, password);
  };

  return (
    <div>
      <Navbar />
      {user ? (
        <div>
          <Routes>
            <Route path="/" exact element={<EntryPoint />} />
            <Route path="/session" exact element={<QRCodeScanner />} />
            <Route path="/send-message" element={<SendMessage />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      ) : (
        <div className="login-form-container">
          <form onSubmit={handlelogin}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

function Test() {
  return <div>Test Component</div>;
}
