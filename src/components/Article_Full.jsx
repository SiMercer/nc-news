import React from "react";
import Comment_Container from "./Comment_Container";
import { patchArticleVotes } from "../api";
import { useState, useEffect } from "react";

function Article_Full({ article, comments }) {
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
          <div>
            Votes: {articlesVotesTally}
            <button
              disabled={voteMade === 1}
              onClick={() => handleVotePatch("inc")}
            >
              Add
            </button>
            <button
              disabled={voteMade === -1}
              onClick={() => handleVotePatch("dec")}
            >
              Min
            </button>
          </div>
        </div>

        <Comment_Container article_id={article.article_id} />
      </div>
    </>
  );
}

export default Article_Full;
