import React, { useState } from "react";

// Single comment component with reply button
const Comment = ({ data, onReply }) => {
  const { name, text } = data;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-2 rounded-lg shadow-sm">
      <img
        alt="user"
        className="w-8 h-8"
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
        <button
          className="text-blue-500 text-sm mt-1"
          onClick={onReply}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

// Reusable comment form
const CommentForm = ({ onSubmit, onCancel }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;
    onSubmit(input);
    setInput("");
  };

  return (
    <div className="flex flex-col mt-2 mb-4">
      <textarea
        className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key == 'Enter') && handleSubmit()}
        placeholder="Add a comment..."
      />
      <div className="mt-1 flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Comment
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

// Recursively render list
const CommentList = ({ comments, addReply }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment
        data={comment}
        onReply={() => addReply(comment)}
      />
      {/* Nested replies */}
      <div className="ml-6 border-l pl-4 mt-2">
        {comment.showReplyForm && (
          <CommentForm
            onSubmit={(text) => addReply(comment, text)}
            onCancel={() => addReply(comment, null)}
          />
        )}
        <CommentList
          comments={comment.replies}
          addReply={addReply}
        />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);

  const addTopLevelComment = (text) => {
    setComments([
      ...comments,
      {
        name: "You",
        text,
        replies: [],
        showReplyForm: false,
      },
    ]);
  };

  const addReply = (targetComment, replyText = "") => {
    const updateComments = (commentsList) =>
      commentsList.map((comment) => {
        if (comment === targetComment) {
          if (replyText === "") {
            return { ...comment, showReplyForm: !comment.showReplyForm };
          } else {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                { name: "You", text: replyText, replies: [], showReplyForm: false },
              ],
              showReplyForm: false,
            };
          }
        }

        return {
          ...comment,
          replies: updateComments(comment.replies),
        };
      });

    setComments(updateComments(comments));
  };

  return (
    <div className="md:block hidden m-5 md:pl-20">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Comments</h1>
      <CommentForm onSubmit={addTopLevelComment} />
      <CommentList comments={comments} addReply={addReply} />
    </div>
  );
};

export default CommentsContainer;
