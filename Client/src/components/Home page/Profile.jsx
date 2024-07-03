import React from 'react';
import { useUser } from '../personalArea/UserContext'
import { Button } from 'primereact/button';
const Profile = ({ onClose }) => {
  const { currentUser } = useUser();
  console.log('hello my profile page');
  if (!currentUser) {
    return <p>No user is currently logged in.</p>;
  }
  return (
    <div><br />
      <Button style={{ color: 'black' }} onClick={onClose} icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
      <img
        src={`../profileImage/userProfile_${currentUser.userName}.png`}
        alt="Profile"
        className="profile-image"
        style={{ width: '60px', height: '60px', border: '1px solid rgb(48, 48, 48)', borderRadius: '50%', position:'absolute',marginLeft: '60%', cursor: 'pointer' }}
      />
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Username:</strong> {currentUser.username}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>City:</strong> {currentUser.city}</p>
      <p><strong>Age:</strong> {currentUser.age}</p>
      <p><strong>Gender:</strong> {currentUser.gender}</p>
      <p><strong>Job:</strong> {currentUser.job}</p>
    </div>
  )
}

export default Profile
