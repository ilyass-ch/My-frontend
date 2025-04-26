import React from 'react';
import ProfileView from './ProfileView'; // Adjust the path accordingly
import image from '../../assets/image.webp';

const TestProfileView = () => {
  const fakeUser = {
    id: '12345',
    username: 'john_doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    photo: image, // This should be a base64 string or a URL
    enabled: true,
    roles: ['USER', 'MANAGER'], // Sample roles
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden p-8">
      <ProfileView user={fakeUser} />
    </div>
  );
};

export default TestProfileView;
