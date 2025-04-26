import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, saveProfile } from './ProfileSlice';
import Spinner from '../../components/Loader/Spinner';
import ProfileView from './ProfileView';
import ProfileEditForm from './ProfileEditForm';

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
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden p-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">Mon Profil</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <ProfileView user={user} />
        <ProfileEditForm
          formData={formData}
          preview={preview}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
