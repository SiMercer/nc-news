import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { getTopics, getUsers } from "./api.js";
import Header from "./components/Header.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Articles_Container from "./components/Articles_Container.jsx";
import UserProfile from "./components/User_Profile.jsx";

function App() {
  const [topics, setTopics] = useState(["coding"]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getUsers().then((res) => {
      setUser(res.data.users[0]);
    });

    getTopics().then((res) => {
      setTopics(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              topics={topics}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          }
        />
        <Route
          path="/articles"
          element={
            <Articles_Container
              topics={topics}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              user={user}
            />
          }
        />

        <Route
          path="/user"
          element={<UserProfile user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
