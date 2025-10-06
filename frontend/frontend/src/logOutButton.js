import React from "react";

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <button className="btn btn-danger" onClick={handleLogout}>Çıkış Yap</button>
  );
}
export default LogoutButton;