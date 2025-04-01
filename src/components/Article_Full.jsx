import React from "react";
import Comment_Container from "./Comment_Container";

function Article_Full({ article, comments }) {
  return (
    <>
      <div className="article_full">
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

        <div className="articleBody">
          <h4>{article.body}</h4>
        </div>

        <div className="articleVotes">
          <h4>Votes: {article.votes}</h4>
        </div>

        <Comment_Container article_id={article.article_id} />
      </div>
    </>
  );
}

export default Article_Full;
