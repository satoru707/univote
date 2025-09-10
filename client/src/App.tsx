import { BrowserRouter as Router, Routes, Route } from "react-router";
import Landing from "./Homepage/Landing";
import StudentLogin from "./Homepage/student/Login";
import Verify from "./Homepage/student/Verify";
import StudentDashboard from "./Homepage/student/Dashboard";
import ElectionDetails from "./Homepage/student/ElectionDetails";
import VoteConfirmation from "./Homepage/student/VoteConfirmation";
import Results from "./Homepage/student/Results";
import AdminDashboard from "./Homepage/admin/ElectionModal";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* LANDING PAGE */}
          <Route path="/" element={<Landing />} />

          {/* OTHER ROUTES */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/elections" element={<ElectionDetails />} />
          <Route path="/results" element={<Results />} />
          <Route path="/vote-confirmation" element={<VoteConfirmation />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
