import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoDefault from "../assets/Logo-FeedDuck_press.png";
import logoCoding from "../assets/Logo-FeedDuck_coding.png";
import logoCooking from "../assets/Logo-FeedDuck_cooking.png";
import logoSports from "../assets/Logo-FeedDuck_sport.png";

function Header({ user, selectedTopic }) {
  const navigate = useNavigate();

  const handleUserProfile = () => {
    navigate("/user");
  };

  let logoToUse;

  switch (selectedTopic) {
    case "coding":
      logoToUse = logoCoding;
      break;
    case "cooking":
      logoToUse = logoCooking;
      break;
    case "football":
      logoToUse = logoSports;
      break;
    default:
      logoToUse = logoDefault;
  }

  return (
    <header className="header">
      <div className="headerText">FeedDuck</div>
      <div>
        <img
          src={logoToUse}
          alt="FeedDuck Logo"
          className="headerLogo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div
        style={{
          overflow: "hidden",
          width: "125px",
          height: "125px",
          margin: "auto 25px auto auto ",
          display: "grid",
        }}
      >
        <div
          onClick={handleUserProfile}
          className="headerProfileImg"
          style={{
            width: "75px",
            height: "75px",
            backgroundImage: `url(${user?.avatar_url || "default-avatar.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            margin: "auto",
            display: "flex",
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
