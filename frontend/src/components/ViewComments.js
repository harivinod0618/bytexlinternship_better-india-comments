
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const ViewComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts/comments")
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  const handleDelete = async (commentId, postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/comments/${commentId}`, {
        data: { postId },
      });
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-600">No comments yet.</p>
      ) : (
        <div className="grid gap-4">
          {comments.map((comment) => (
            <div
              key={comment.commentId}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-start transition duration-300 ease-in-out hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-700"><strong>Post:</strong> {comment.postTitle}</p>
                <p className="text-sm text-gray-700"><strong>User:</strong> {comment.userName}</p>
                <p className="text-md mt-2 text-gray-800"><strong>Comment:</strong> {comment.text}</p>
              </div>
              <button
                onClick={() => handleDelete(comment.commentId, comment.postId)}
                className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition transform hover:scale-110 active:scale-95 duration-200"
                title="Delete Comment"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewComments;
