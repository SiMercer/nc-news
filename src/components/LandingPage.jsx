import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import TopicsCard from "./Topics_Card";

function LandingPage({ topics, setSelectedTopic }) {
  const [articleForTopics, setArticleForTopics] = useState([]);

  useEffect(() => {
    getArticles()
      .then((res) => {
        const articles = res.data.articles || [];

        const articlePerTopic = topics
          .map((topic) => {
            const article = articles.find(
              (article) => article.topic === topic.slug
            );
            return article ? { ...article, topicName: topic.slug } : null;
          })
          .filter(Boolean);

        setArticleForTopics(articlePerTopic);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
      });
  }, [topics]);

  return (
    <section className="articles">
      <div className="articles-Nav">
        {/* <button className="navText" onClick={() => setSelectedTopic("All")}>
          Browse All Articles
        </button> */}
      </div>

      <h2 style={{ paddingLeft: "20px" }}>Select a Topic</h2>

      <div className="articlesContainerPreview">
        {articleForTopics.map((article) => (
          <TopicsCard
            key={article.article_id}
            article={article}
            setSelectedTopic={setSelectedTopic}
          />
        ))}
      </div>
    </section>
  );
}

export default LandingPage;
