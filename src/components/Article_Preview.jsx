import { React, useState, useEffect } from "react";

function Article_Preview({ article, comments, onSelect }) {
  return (
    <>
      <div
        onClick={() => onSelect(article.article_id)}
        className="article_preview"
      >
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
    </>
  );
}

export default Article_Preview;
