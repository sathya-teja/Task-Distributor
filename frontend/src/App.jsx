import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Upload from "./pages/Upload";
import Sidebar from "./components/Sidebar";
import DistributedTasks from "./pages/DistributedTasks";

function AppContent() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {showSidebar && <Sidebar />}
      <div className="flex-1 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/distributed-tasks" element={<DistributedTasks />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
