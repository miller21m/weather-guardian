import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Alerts from '../pages/Alerts';
import CurrentState from '../pages/CurrentState';

import { useAuth } from '../context/AuthContext';

import Navbar from '../components/Navbar';

import './Router.css';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? (
    <div className='secure-route-container'>
        {children}
    </div>
  ) : (<Navigate to="/login" />);
}

function AppRouter() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/alerts" element={
            <PrivateRoute>
                <Alerts />
            </PrivateRoute>
        } />

        <Route path="/currentState" element={
            <PrivateRoute>
                <CurrentState />
            </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default AppRouter;