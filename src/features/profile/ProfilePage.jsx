import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, saveProfile } from './ProfileSlice';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/Loader/Spinner';
import { Avatar, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    photo: ''
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        photo: user.photo || ''
      });
      setPreview(user.photo || '');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    dispatch(saveProfile({ id: userId, data: formData }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={40} thickness={4} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">Erreur : {error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Mon Profil</h2>

      <div className="flex flex-col items-center gap-4 mb-8">
        <Avatar
          alt="Photo de profil"
          src={preview || 'https://via.placeholder.com/150'}
          sx={{
            width: 100,
            height: 100,
            border: '3px solid #3b82f6',
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
          color: '#fff',
          borderRadius: '50px',
          fontWeight: '600',
          textTransform: 'none',
          marginY: 1,
          paddingX: 1.3,
          paddingY: 1.2,
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
        Upload Photo
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
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <SubmitButton label="Mettre à jour" loading={loading} />
      </form>
    </div>
  );
};

export default ProfilePage;
