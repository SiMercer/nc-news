import React from "react";
import { useNavigate } from "react-router-dom";

function TopicsCard({ article, setSelectedTopic }) {
  const navigate = useNavigate();

  return (
    <section
      className="topic_preview"
      onClick={() => {
        setSelectedTopic(article.topic);
        navigate("/articles");
      }}
    >
      <div className="topicCardTitle">{article.topic}</div>
      <div className="topic_ArticlePreview ">
        <div className="articleTitletopic">
          {article.topic} : {article.author}
        </div>

        <div className="articleTitlePreview">{article.title}</div>

        <div className="articleTitleDate">{article.created_at}</div>

        <div>
          <img
            className="articleImage"
            src={article.article_img_url}
            alt={article.title}
          />
        </div>

        <div className="articleVotes">Votes: {article.votes}</div>
      </div>
    </section>
  );
}

export default TopicsCard;
