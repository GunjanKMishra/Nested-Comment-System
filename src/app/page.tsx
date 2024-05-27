"use client";
import { on } from "events";
import { useState } from "react";

interface Comment {
  id: number;
  body: string;
  comments: Comment[];
}

const dummyComments: Comment[] = [
  {
    id: 1,
    body: "This is a comment 1",
    comments: [],
  },
  {
    id: 2,
    body: "This is comment 2",
    comments: [],
  },
  {
    id: 3,
    body: "This is comment 3",
    comments: [],
  },
];

export default function Home() {
  const [comments, setComments] = useState(dummyComments);

  // const handleMainInput = () => {
  //   if (newMainComment != "") {
  //     // setComments([
  //     //   ...comments,
  //     //   {
  //     //     id: comments.length + 1,
  //     //     body: newMainComment,
  //     //   },
  //     // ]);
  //     // or
  //     setComments((prevComments) => [
  //       {
  //         id: prevComments.length + 1,
  //         body: newMainComment,
  //         comment: [],
  //       },
  //       ...prevComments,
  //     ]);
  //     setNewMainComment("");
  //   }
  // };

  const onComment = (newComment: Comment) => {
    setComments([newComment, ...comments]);
  };

  return (
    <div className="flex flex-col gap-3 min-h-screen w-screen p-6 items-center">
      <h1 className="text-center">Hello commenting</h1>

      {/* Main comment input */}
      <CommentInput onComment={onComment} />

      {/* Comments display */}
      <div className="flex flex-col gap-3 w-full">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
}

//CommentInput component
interface CommentInputProp {
  onComment: (newComment: Comment) => void;
}
const CommentInput = ({ onComment }: CommentInputProp) => {
  const [newMainComment, setNewMainComment] = useState("");
  return (
    <div className="flex flex-col gap-3 w-full">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Write your comment here"
        value={newMainComment}
        onChange={(e) => setNewMainComment(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => {
          if (newMainComment != "") {
            onComment({
              id: Math.floor(Math.random() * 1000),
              body: newMainComment,
              comments: [],
            });
            setNewMainComment("");
          }
        }}
      >
        Post Comment
      </button>
    </div>
  );
};

//CommentItem component  **** IMPORTANT ++++ ****
interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments);

  const onComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    setIsReplying(false);
  };

  const handleReply = () => {
    setIsReplying(!isReplying);
  };
  return (
    <div className="p-2">
      <div className="bg-gray-100 p-4 rounded-md mb-2">
        {comment.body}
        <button className="text-blue-500" onClick={handleReply}>
          {isReplying ? "Cancle" : "Reply"}
        </button>
      </div>
      {/* hidden to show transition*/}
      {isReplying && <CommentInput onComment={onComment} />}
      <div className="pl-6 flex flex-col gap-3">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
