import React, { useState, useEffect } from "react";
import { getCommentsByArticleByID } from "../api";
import Comments from "./Comments_Card";

function Comment_Container({ article_id }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article_id) return;

    getCommentsByArticleByID(article_id)
      .then((data) => {
        setComments(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setError("Unable to load comments");
        setComments([]);
      });
  }, [article_id]);

  return (
    <section className="Comments">
      {error && <p>{error}</p>}
      <Comments comments={comments} />
    </section>
  );
}

export default Comment_Container;
