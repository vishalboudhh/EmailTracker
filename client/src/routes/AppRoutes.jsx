import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import PrivateRoute from "./PrivateRoute";
import PageWrapper from "../components/layout/PageWrapper";
import Applications from "../pages/applications/Applications";
import Resume from "../pages/resume/Resume";
import SendMail from "../pages/mail/SendMail";
import { useAuth } from "../context/AuthContext";

function RootRedirect() {
    const { token } = useAuth();
    return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED LAYOUT */}
            <Route
                element={
                    <PrivateRoute>
                        <PageWrapper />
                    </PrivateRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/mail" element={<SendMail />} />

            </Route>
        </Routes>
    );
}
