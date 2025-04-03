import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import TopicsCard from "./Topics_Card";

function LandingPage({ topics, setSelectedTopic }) {
  const [articleForTopics, setArticleForTopics] = useState([]);

  useEffect(() => {
    getArticles("created_at", "desc")
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
    <section>
      <div></div>

      <div>
        <h2>Featured Topics</h2>

        {articleForTopics.map((article) => (
          <TopicsCard article={article} setSelectedTopic={setSelectedTopic} />
        ))}
      </div>
    </section>
  );
}

export default LandingPage;
