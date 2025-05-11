import React from "react";

const commentsData = [
  {
    name: "nested comments test",
    text: "hi",
    replies: [
      {
        name: "yogi",
        text: "hi",
        replies: [],
      },
      {
        name: "yogi",
        text: "nested comments ",
        replies: [],
      },
    ],
  },
  {
    name: "yogi",
    text: "nested comments ",
    replies: [],
  },
  {
    name: "yogi",
    text: "hello",
    replies: [],
  },
  {
    name: "yogi",
    text: "hello",
    replies: [
      {
        name: "yogi",
        text: "nested comments ",
        replies: [
          {
            name: "yogi",
            text: "hello",
            replies: [],
          },
          {
            name: "yogi",
            text: "hello",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "yogi",
    text: "hello",
    replies: [],
  },
  {
    name: "yogi",
    text: "hello",
    replies: [],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg text-black dark:bg-gray-900 dark:text-white">
      <img
        alt="usericon"
        className="w-8 h-8"
        src="https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((i, index) => (
    <div key={index}>
      <Comment data={i} />
      <div className="pl-5 border-l-black ml-5">
        <CommentList comments={i.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div>
      <div className="m-5 pl-20">
        <h1 className="text-2xl font-bold">Comments</h1>
        <CommentList comments={commentsData} />
      </div>
    </div>
  );
};

export default CommentsContainer;
