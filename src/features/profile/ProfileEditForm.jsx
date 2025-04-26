import React from 'react';
import { Avatar, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import SubmitButton from '../../components/buttons/SubmitButton';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ProfileEditForm = ({ formData, preview, handleChange, handleSubmit, loading }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Modifier Mes Infos</h3>

      <div className="flex flex-col items-center mb-6">
        <Avatar
          alt="Photo de profil"
          src={preview || 'https://via.placeholder.com/150'}
          sx={{
            width: 120,
            height: 120,
            border: '3px solid #3b82f6',
            boxShadow: 3,
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 24px rgba(59,130,246,0.4)',
            }
          }}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            marginTop: 2,
            background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            borderRadius: '50px',
            fontWeight: '600',
            textTransform: 'none',
            paddingX: 2,
            paddingY: 1,
            fontSize: '0.95rem',
            boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 16px rgba(37,99,235,0.4)',
            },
          }}
        >
          Changer la Photo
          <VisuallyHiddenInput
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <SubmitButton label="Mettre à jour" loading={loading} />
      </form>
    </div>
  );
};

export default ProfileEditForm;
