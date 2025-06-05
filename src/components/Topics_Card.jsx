import React from "react";
import { useNavigate } from "react-router-dom";

function TopicsCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/articles?topics=${article.topic}`)}
      className="article_preview"
    >
      <div className="article_preview_image_container">
        <img
          className="article_preview_image"
          src={article.article_img_url}
          alt={article.title}
        />
        <div className="article_preview_topic_overlay">{article.topic}</div>
      </div>

      <section className="article_preview_text">
        <div className="topicCardTitle">{article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</div>

      </section>
    </div>
  );
}

export default TopicsCard;
