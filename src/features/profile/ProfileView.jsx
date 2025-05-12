import React from 'react';
import { Tag } from 'antd';
import { Avatar, Typography, IconButton } from '@mui/material'; // Import Avatar and Typography from MU
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import { useNavigate } from 'react-router-dom'; // To handle redirection
import './Profile.css'; // Import your CSS file for styling



// Helper function to get role colors
const getRoleColor = (role) => {
  switch (role) {
    case 'ADMIN':
      return 'red';
    case 'USER':
      return 'blue';
    case 'MANAGER':
      return 'green';
    default:
      return 'gray';
  }
};

const ProfileView = ({ user }) => {
  const navigate = useNavigate(); // Hook to handle redirection

  if (!user) return null; // If no user, return nothing
  console.log("user", user);
  

  // Handle submit and redirect to the edit profile page
  const handleSubmit = () => {
    // You can perform any logic here before redirecting
    navigate('/edit-profile'); // Redirect to the edit profile page
  };

  return (
    <div style={{ display: 'flex', height: 'auto' }}>

      {/* Avatar and username */}
      <div style={{ flex: 3 }}>
        <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    textDecoration: 'underline'
                    }} 
                    className="profile-title">Informations Profile</h3>
        <div>
          <Avatar
            alt="Photo de profil"
             src={user.photo ? `data:image/jpeg;base64,${user.photo}` : 'https://via.placeholder.com/150'}
              sx={{
              width: 120,
              height: 120,
              border: '3px solid #3b82f6',
              boxShadow: 3,
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 24px rgba(59,130,246,0.4)',
              },
            }}
          />
          <div className="user-info">
            <Typography  style={{
                                  fontSize: '20px',
                                  fontFamily: 'Poppins, sans-serif',
                                  fontWeight: 600,
                                  color: '#1f2937', // équivalent Tailwind text-gray-900
                                  letterSpacing: '0.5px',
                                }} variant="h5" className="font-semibold text-gray-900">
              {user.username}
            </Typography>
            <Typography style={{fontSize:12, fontFamily: 'Poppins, sans-serif'}} variant="body2" className="text-gray-600">
              {user.email}
            </Typography>
          </div>
        </div>
      </div>

      {/* Display user ID, phone, and status */}
      <div style={{ flex: 6, marginLeft: 40, marginRight: 40, height: 'auto' }} className="profile-container">
        <div className="flex flex-col space-y-6 p-8 bg-white rounded-lg shadow-xl mx-10 my-8">
          {/* User Information */}
          <div className="space-y-3">
            <Typography variant="h6" className="text-gray-800 font-semibold">
              Informations Générales
            </Typography>
            <div className="space-y-2">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">ID:</span> {user.id}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Téléphone:</span> {user.phone}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Activé:</span> {user.enabled ? 'Oui' : 'Non'}
              </p>
            </div>
          </div>

          {/* Roles */}
          <div className="mt-6">
            <Typography variant="h6" className="text-gray-800 font-semibold mb-4">
              Rôles
            </Typography>
            <div className="flex flex-wrap gap-4">
              {Array.isArray(user.roles) && user.roles.length > 0 ? (
                user.roles.map((role, index) => (
                  <Tag
                    key={index}
                    color={getRoleColor(role)}
                    className="text-base font-medium px-4 py-2 rounded-full shadow-md"
                  >
                    {role}
                  </Tag>
                ))
              ) : (
                <p>Aucun rôle attribué.</p> // Optionnel, affiche un message si les rôles sont vides
              )}
            </div>

          </div>
        </div>
      </div>
              {/* Icon button to edit profile */}
        <div className="mt-6 text-right" style={{ flex: 1 }}>
            <IconButton style={{color: '#8eaad7'}} onClick={handleSubmit} aria-label="edit profile">
            <ModeTwoToneIcon fontSize="large" />
            </IconButton>
        </div>

    </div>
  );
};

export default ProfileView;
