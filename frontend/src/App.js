import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const createPost = () => {
    axios
      .post("http://localhost:5000/posts", { user_id: 1, content })
      .then(() => {
        setContent("");
        alert("Post created!");
      });
  };

  return (
    <div>
      <h1>Social Media</h1>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={createPost}>Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
