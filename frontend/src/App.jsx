import { Route, Routes } from "react-router-dom";
import QRCodeScanner from "./pages/QRCodeScanner";
import SendMessage from "./pages/SendMessage";
import "./App.css";
import supabase from "./config/SupabaseClient";
import EntryPoint from "./pages/EntryPoint";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<EntryPoint />} />
        <Route path="/session" exact element={<QRCodeScanner />} />
        <Route path="/send-message" element={<SendMessage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;

function Test() {
  return <div></div>;
}
