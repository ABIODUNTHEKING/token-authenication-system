import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import StateManager from "./stateManager/StateManager";
import ProtectedRoute from "./stateManager/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StateManager />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<SignIn />} path="/sign-in" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<ForgotPassword />} path="/forgot-password" />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
