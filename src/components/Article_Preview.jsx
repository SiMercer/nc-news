import { React, useState, useEffect } from "react";

function Article_Preview({ article, comments, onSelect }) {
  return (
    <>
      <div
        onClick={() => onSelect(article.article_id)}
        className="article_preview"
      >
        <div className="article_preview_image_container">
          <img
            className="article_preview_image"
            src={article.article_img_url}
            alt={article.title}
          />
          <div className="article_preview_topic_overlay">:{article.topic}</div>
        </div>
        <selection className="article_preview_text">
          <div className="article_preview_titles">{article.title}</div>

          <div className="article_preview_meta">
            <div className="article_preview_created_at">
              {article.created_at.slice(0, -14)}
            </div>
            <div className="article_preview_topic">{article.author}</div>
            <div className="article_preview_votes">Votes: {article.votes}</div>
          </div>
        </selection>
      </div>
    </>
  );
}

export default Article_Preview;
