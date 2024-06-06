const fs = require("fs");

// Load and parse the JSON file
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// Arrays to hold the parsed data
const users = [];
const requests = [];
const comments = [];

// Helper function to find or add a user
const findOrAddUser = (user) => {
  const existingUser = users.find((u) => u.username === user.username);
  if (existingUser) {
    return existingUser.id;
  }
  const userId = users.length + 1;
  users.push({
    id: userId,
    image: user.image,
    name: user.name,
    username: user.username,
  });
  return userId;
};

// Process currentUser
const currentUser = data.currentUser;
findOrAddUser(currentUser);

// Process productRequests and comments
data.productRequests.forEach((request) => {
  requests.push({
    id: request.id,
    title: request.title,
    category: request.category,
    upvotes: request.upvotes,
    status: request.status,
    description: request.description,
  });

  // Process comments and replies
  const processComment = (comment, requestId, parentCommentId = null) => {
    const userId = findOrAddUser(comment.user);
    const commentId = comments.length + 1;
    comments.push({
      id: commentId,
      content: comment.content,
      user_id: userId,
      request_id: requestId,
      parent_comment_id: parentCommentId,
    });

    if (comment.replies) {
      comment.replies.forEach((reply) => {
        processComment(reply, requestId, commentId);
      });
    }
  };

  if (request.comments) {
    request.comments.forEach((comment) => {
      processComment(comment, request.id);
    });
  }
});

// Save the results to JSON files
fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
fs.writeFileSync("requests.json", JSON.stringify(requests, null, 2));
fs.writeFileSync("comments.json", JSON.stringify(comments, null, 2));

console.log(
  "Data has been separated into users.json, requests.json, and comments.json",
);
