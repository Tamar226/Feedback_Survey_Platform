import React from 'react';
import { useUser } from '../personalArea/UserContext'

export default function ProfilePage() {
  const { currentUser } = useUser();
console.log('hello my profile page');
  if (!currentUser) {
    return <p>No user is currently logged in.</p>;
  }

  return (
    <div className="profile-card">
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Username:</strong> {currentUser.userName}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>City:</strong> {currentUser.city}</p>
      <p><strong>Age:</strong> {currentUser.age}</p>
      <p><strong>Gender:</strong> {currentUser.gender}</p>
      <p><strong>Job:</strong> {currentUser.job}</p>
    </div>
  );
}
