import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/splash";
import Login from "./pages/loginpage";
import CreateAccount from "./pages/createAccount";
import ForgotPassword from "./pages/forget-password";
import Home from "./pages/naturalHome";
import DepartmentPage from "./pages/dipartmentPage";
import ProgramStudyPage from "./pages/ProgramStudyPage";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/naturalHome" element={<Home />} />
            <Route
              path="/department/:departmentSlug"
              element={<DepartmentPage />}
            />
            <Route
              path="/department/:departmentSlug/program/:programName"
              element={<ProgramStudyPage />}
            />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
