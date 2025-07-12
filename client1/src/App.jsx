// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import PrivateRoute from './Privateroute';
import SummaryPage from './components/Summary';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect / to /signup */}
          <Route path="/" element={<Navigate to="/signup" />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Route */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <PrivateRoute>
                <SummaryPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
