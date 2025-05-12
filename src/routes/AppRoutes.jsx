import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProfileIndex from '../features/profile/index';
import ProductIndex from '../features/products/indexClient.product'; 
import ProductIndexAdmin from '../features/products/index.product'; 
import Profile from '../features/profile/TestProfileView';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/protected/ProtectedRoute'; // Importer le composant

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Page principale */}
        <Route path="/" element={<Home />}>
          <Route path="edit-profile" element={<ProfileIndex />} />
          <Route path="products" element={<ProductIndex />} />
          <Route path="profile" element={<Profile />} />
          <Route
          path="admin/products"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProductIndexAdmin /> {/* Page dédiée aux produits pour les admins */}
            </ProtectedRoute>
          }
        />
        </Route>

        {/* Auth pages sans sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées pour les admins */}

        {/* Autres routes pour l'admin peuvent être ajoutées ici */}

        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
