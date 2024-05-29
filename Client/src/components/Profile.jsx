import React from 'react';
import { useUser } from './UserContext';

export default function ProfilePage() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <p>No user is currently logged in.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Username:</strong> {currentUser.userName}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Company:</strong> {currentUser.company}</p>
    </div>
  );
}
