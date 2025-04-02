import React, { useState, useEffect } from "react";
import { getCommentsByArticleByID, postCommentByArticleID } from "../api";
import Comments from "./Comments_Card";

function Comment_Container({ article_id, user }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);

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

  const handelAddComment = () => {
    var x = document.getElementById("addCommentDiv");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  const handelPostComment = (event) => {
    event.preventDefault();
    const comment = {
      username: user.username,
      article_id: article_id,
      body: newComment,
      votes: 0,
    };

    postCommentByArticleID(article_id, comment).then((postedComment) => {
      setComments((prev) => [postedComment, ...prev]);
      setNewComment("");
    });
    handelAddComment();
  };

  return (
    <section className="Comments">
      <div>
        <button onClick={handelAddComment}>Post Comment</button>
      </div>
      <div
        id="addCommentDiv"
        style={{
          display: "none",
        }}
      >
        <form onSubmit={handelPostComment}>
          <input
            name="commentBody"
            value={newComment}
            placeholder="Enter comment & submit..."
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button type="submit" disabled={!newComment.trim()}>
            Submit
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}
      <Comments comments={comments} />
    </section>
  );
}

export default Comment_Container;
