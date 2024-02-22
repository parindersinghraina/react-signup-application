import React from 'react';
import './InstagramPosts.css';

interface InstagramPostProps {
  post: {
    profilePic: string;
    username: string;
    image: string;
    caption: string;
    time: string;
  };
}

const InstagramPost: React.FC<InstagramPostProps> = ({ post }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <img className="profile-pic" src={post.profilePic} alt="Profile" />
        <div className="username">{post.username}</div>
      </div>
      <img className="post-image" src={post.image} alt="Post" />
      <div className="post-caption">{post.caption}</div>
      <div className="like-comment-container">
        <button>Like</button>
        <button>Comment</button>
      </div>
      <div className="post-time">{post.time}</div>
    </div>
  );
};

export default InstagramPost;