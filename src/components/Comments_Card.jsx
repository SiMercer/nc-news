import React from "react";

function CommentCard({
  comment,
  user,
  isConfirming,
  onDeleteClick,
  onCancelClick,
  onConfirmDelete,
}) {
  const isAuthor = comment.author === user.username;

  return (
    <li>
      <div className="commentUser">
        {comment.author} :<h6>{comment.created_at}</h6>
      </div>

      {isAuthor && !isConfirming && (
        <div className="deleteReq">
          <button onClick={() => onDeleteClick(comment.comment_id)}>
            Delete Comment
          </button>
        </div>
      )}

      {isAuthor && isConfirming && (
        <div className="deleteComfirm">
          <button onClick={() => onConfirmDelete(comment.comment_id)}>
            Confirm
          </button>
          <button onClick={onCancelClick}>Cancel</button>
        </div>
      )}

      <div className="comment">{comment.body}</div>
      <div>
        <h6>Votes {comment.votes}</h6>
      </div>
    </li>
  );
}

export default CommentCard;
