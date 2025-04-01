import React from "react";

function Comments({ comments }) {
  return (
    <div className="articleComments">
      <h4>Comments:</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <strong>{comment.author}</strong>: {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
