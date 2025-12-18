import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(setUser);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!user) return <p style={{ padding: 20 }}>Loading profile...</p>;

  return (
    <div className="card">
      <h2>Profile</h2>

      <div className="profile-row">
        <span>Name</span>
        <span>{user.name}</span>
      </div>

      <div className="profile-row">
        <span>Email</span>
        <span>{user.email}</span>
      </div>

      <div className="profile-row">
        <span>Joined</span>
        <span>{new Date(user.createdAt).toDateString()}</span>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
