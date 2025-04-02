import { React, useState, useEffect } from "react";
import { getUsers } from "../api.js";
import { useNavigate } from "react-router-dom";

function UserProfile({ user, setUser }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  const handleUserChange = (event) => {
    const selectedUsername = event.target.value;
    const selectedUser = users.find((u) => u.username === selectedUsername);
    setUser(selectedUser);
    handleBackToArticles();
  };

  const handleBackToArticles = () => {
    navigate("/articles");
  };

  return (
    <div className="topics">
      <label htmlFor="topics">Switch User:</label>
      <select
        name="userSelect"
        id="userSelect"
        value={user?.username || ""}
        onChange={handleUserChange}
      >
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>

      <div>
        <button onClick={handleBackToArticles}>Back to the articles</button>
      </div>
    </div>
  );
}

export default UserProfile;
