import React from 'react';
import OnePost from './OnePost';
import './PostList.css';

function PostList({ posts }) {
    return (
        <div className="posts-container">
            {posts.map(post => (
                <OnePost key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;