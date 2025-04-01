import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { getTopics } from "./api.js";
import Header from "./components/Header.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Articles_Container from "./components/Articles_Container.jsx";

function App() {
  const [topics, setTopics] = useState(["coding"]);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
