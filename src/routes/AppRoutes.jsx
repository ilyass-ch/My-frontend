import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProfilePage from '../features/profile/ProfilePage';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Page principale */}
        <Route path="/" element={<Home />} >
          <Route path="profile" element={<ProfilePage />} />
          {/* Tu peux ajouter ici d'autres routes imbriquées */}
        </Route>

        {/* Auth pages sans sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
