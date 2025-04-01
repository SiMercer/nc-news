import React from "react";

function Comments({ comments }) {
  return (
    <div className="articleComments">
      <div className="commentsHeader">Comments:</div>

      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <div className="commentUser">{comment.author} :</div>

            <div className="comment">{comment.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
