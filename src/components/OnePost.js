import React from 'react';
import './OnePost.css';

function OnePost({ post }) {
    return (
        <div className="post-card">
            <div className="post-info">
                <span className="post-author">Autor ID: {post.authorId}</span>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            {post.contentImage && <img src={post.contentImage} alt="Post" className="post-image" />}
            <p className="post-description">{post.description}</p>
        </div>
    );
}

export default OnePost;