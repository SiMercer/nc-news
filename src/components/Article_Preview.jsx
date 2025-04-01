import { React, useState, useEffect } from "react";

function Article_Preview({ article, comments, onSelect }) {
  return (
    <>
      <div
        onClick={() => onSelect(article.article_id)}
        className="article_full"
      >
        <div className="articleTitletopic">
          <p>
            {article.topic} : {article.author}
          </p>
        </div>

        <div className="articleTitle">
          <p>{article.title}</p>
        </div>

        <div className="articleTitleDate">
          <p>{article.created_at}</p>
        </div>

        <div>
          <img
            className="articleImage"
            src={article.article_img_url}
            alt={article.title}
          />
        </div>

        <div className="articleVotes">
          <h4>Votes: {article.votes}</h4>
        </div>
      </div>
    </>
  );
}

export default Article_Preview;
