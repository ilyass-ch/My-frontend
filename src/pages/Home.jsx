import React from 'react';
import { Outlet } from 'react-router-dom';  // Permet de rendre le contenu de la route imbriquée
import SideBar from '../components/SideBar/SideBar';  

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />  {/* Affiche toujours la barre latérale */}
    </div>
  );
};

export default Home;
