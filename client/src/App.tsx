import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ElectionProvider } from "./context/ElectionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/common/Toast";

import Landing from "./pages/Landing";
import StudentLogin from "./pages/student/Login";
import Verify from "./pages/student/Verify";
import StudentDashboard from "./pages/student/Dashboard";
import ElectionDetails from "./pages/student/ElectionDetails";
import VoteConfirmation from "./pages/student/VoteConfirmation";
import Results from "./pages/student/Results";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <AuthProvider>
      <ElectionProvider>
        <Router>
          <div className="App">
            <Toast />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Student Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute studentOnly>
                  <StudentDashboard />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/elections/:id"
                element={
                  // <ProtectedRoute studentOnly>
                  <ElectionDetails />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/elections/:id/results"
                element={
                  // <ProtectedRoute>
                  <Results />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/vote-confirmation"
                element={
                  // <ProtectedRoute studentOnly>
                  <VoteConfirmation />
                  // </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  // <ProtectedRoute adminOnly>
                  <AdminDashboard />
                  // </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </ElectionProvider>
    </AuthProvider>
  );
}

export default App;
