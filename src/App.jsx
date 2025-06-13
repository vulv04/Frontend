import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./router";
import AutoScrollToTop from "./contexts/AutoScrollToTop";

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter/>
    </>
  );
}

export default App;
