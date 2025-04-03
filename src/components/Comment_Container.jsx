import React, { useState, useEffect } from "react";
import {
  getCommentsByArticleByID,
  postCommentByArticleID,
  deleteCommentsByArticleByID,
} from "../api";
import CommentCard from "./Comments_Card";

function Comment_Container({ article_id, user }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);
  const [confirmingCommentId, setConfirmingCommentId] = useState(null);
  const [deletedComments, setDeletedComments] = useState([]);

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

  const handleToggleAddComment = () => {
    setShowAddComment((prev) => !prev);
  };

  const handlePostComment = (event) => {
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
      setShowAddComment(false);
    });
  };

  const handleDeleteClick = (commentId) => {
    setConfirmingCommentId(commentId);
  };

  const handleCancelDelete = () => {
    setConfirmingCommentId(null);
  };

  const handleConfirmDelete = (commentId) => {
    setDeletedComments((prev) => [...prev, commentId]);
    setConfirmingCommentId(null);
    deleteCommentsByArticleByID(commentId);
  };

  return (
    <section className="Comments">
      <div>
        <button onClick={handleToggleAddComment}>Post Comment</button>
      </div>

      {showAddComment && (
        <form onSubmit={handlePostComment}>
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
      )}

      {error && <p>{error}</p>}

      <div className="articleComments">
        <div className="commentsHeader">Comments:</div>
        <ul>
          {comments
            .filter((comment) => !deletedComments.includes(comment.comment_id))
            .map((comment) => (
              <CommentCard
                key={comment.comment_id}
                user={user}
                comment={comment}
                isConfirming={confirmingCommentId === comment.comment_id}
                onDeleteClick={handleDeleteClick}
                onCancelClick={handleCancelDelete}
                onConfirmDelete={handleConfirmDelete}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}

export default Comment_Container;
