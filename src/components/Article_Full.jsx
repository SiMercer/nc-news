import React from "react";
import Comment_Container from "./Comment_Container";
import { patchArticleVotes } from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Article_Full({ article, comments, user }) {
  if (!article) return <p>Loading article...</p>;
  const [articlesVotesTally, setArticlesVotesTally] = useState(article.votes);
  const [voteMade, setVoteMade] = useState("");

  const handleVotePatch = (vote) => {
    setVoteMade(vote === "dec" ? -1 : 1);
    const voteChange = vote === "dec" ? -1 : 1;
    patchArticleVotes(article.article_id, voteChange);

    if (vote === "dec") {
      setArticlesVotesTally(article.votes - 1);
    }

    if (vote === "inc") {
      setArticlesVotesTally(article.votes + 1);
    }
  };

  return (
    <>
      <div className="article_full">
        <div className="articleTitleRow">
          <div className="articleTitle">{article.title}</div>
          <div className="articleTitleDate">
            {article.topic} : {article.author}
          </div>
          <div className="articleTitleDate">
            {article.created_at.slice(0, -14)}
          </div>
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
          <div>
            Votes: {articlesVotesTally}
            <button
              disabled={voteMade === 1}
              onClick={() => handleVotePatch("inc")}
              className="navText"
            >
              Add
            </button>
            <button
              disabled={voteMade === -1}
              onClick={() => handleVotePatch("dec")}
              className="navText"
            >
              Min
            </button>
          </div>
        </div>

        <Comment_Container article_id={article.article_id} user={user} />
      </div>
    </>
  );
}

export default Article_Full;
