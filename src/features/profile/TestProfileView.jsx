import React from 'react';
import ProfileView from './ProfileView';
import defaultImage from '../../assets/image.webp'; // en cas d'absence de photo

const profile = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <p className="text-center text-red-500">Aucun utilisateur connecté.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden p-8">
      <ProfileView user={{
        ...user,
        photo: user.photo || defaultImage, // fallback si pas de photo
      }} />
    </div>
  );
};

export default profile;
