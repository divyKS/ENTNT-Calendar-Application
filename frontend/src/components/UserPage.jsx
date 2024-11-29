import React from 'react';
import LogoutButton from './LogoutButton';
import UserDashboard from './UserDashboard';
import LogCommunication from './LogCommunication';

const UserPage = () => (
    <div>
        <h2>Welcome to the User Page</h2>
        <UserDashboard />
        {/* <LogCommunication /> */}
        <LogoutButton />

    </div>
);

export default UserPage;
