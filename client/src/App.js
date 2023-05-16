import "./App.css";
import MainRouter from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <MainRouter />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
