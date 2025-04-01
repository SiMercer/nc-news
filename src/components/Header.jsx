import React from "react";

function Header() {
  return (
    <header className="header">
      <div>
        <img
          src="src/assets/logos/Logo.png"
          alt="Logo"
          className="headerLogo"
        />
        <img
          src="src/assets/logos/headerUser.png"
          alt="User"
          className="headerUser"
        />
        <p>Hello from Header</p>
      </div>
    </header>
  );
}

export default Header;
