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
    photo: null, // Stocke le fichier
  });
  const [preview, setPreview] = useState('');
  const [userId, setUserId] = useState(null);

  // Récupérer l'utilisateur au chargement
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;
    if (parsedUser?.id) {
      setUserId(parsedUser.id);
      dispatch(getProfile(parsedUser.id));
    }
  }, [dispatch]);

  // Mettre à jour les champs si l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        photo: null, // pour éviter d'écraser le fichier
      });
      setPreview(user.photo || '');
    }
  }, [user]);

  // Gérer les changements des inputs
const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'photo' && files?.length > 0) {
    const file = files[0];
    setFormData((prev) => ({
      ...prev,
      photo: file, // Stocker le fichier au lieu du base64
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // Mettre à jour la prévisualisation
    };
    reader.readAsDataURL(file); // Lit le fichier pour la prévisualisation
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};



  // Envoi du formulaire
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!userId) {
        console.error("ID utilisateur manquant");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo); // Ajouter le fichier photo
      }

      dispatch(saveProfile({ id: userId, data: formDataToSend }))
        .unwrap()
        .then(() => {
          dispatch(getProfile(userId));
          console.log('Profil mis à jour avec succès.');
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
        });
    };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={40} thickness={4} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">{`Erreur: ${error}`}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden p-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">Mon Profil</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* <div className="flex-1">
          <ProfileView user={user} />
        </div> */}
        <div className="flex-1">
          <ProfileEditForm
            formData={formData}
            preview={preview}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
