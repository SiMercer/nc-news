import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({ user }) {
  const navigate = useNavigate();

  const handleUserProfile = () => {
    navigate("/user");
  };

  return (
    <header className="header">
      <div>
        <img src="" alt="Logo" className="headerLogo" />
      </div>

      <div
        style={{
          overflow: "hidden",
          width: "125px",
          height: "125px",
          margin: "auto 25px auto auto ",
        }}
      >
        <div
          onClick={handleUserProfile}
          className="headerProfileImg"
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: `url(${user.avatar_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            margin: "auto",
          }}
        ></div>

        <div
          className="headerProfileUsername"
          style={{
            margin: "auto",
          }}
        >
          {user.username}
        </div>
      </div>
    </header>
  );
}

export default Header;
