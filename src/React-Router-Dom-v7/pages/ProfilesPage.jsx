import React from "react";

const ProfilesPage = () => {
  const profiles = [1, 2, 3, 4, 5];
  return (
    <div>
      {profiles.map((profileId) => (
        <Link key={profileId} to={`/profiles/${profileId}`}>
          Profile:{profileId}
        </Link>
      ))}
    </div>
  );
};

export default ProfilesPage;
