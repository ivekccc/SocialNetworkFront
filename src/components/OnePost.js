import React from 'react';
import './OnePost.css';
import { Link } from 'react-router-dom';

function OnePost({ post }) {
    return (
        <div className="post-card">
            <div className="post-info">
                <Link to={`/users/${post.authorUsername}`} style={{ display: 'flex', alignItems: 'center', textDecoration:'none' }}>
                    <img src={post.authorProfileImage} alt="Autor" className="post-author-image" />
                    <p className="post-author">{post.authorUsername}</p>
                </Link>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            {post.contentImage && <img src={post.contentImage} alt="Post" className="post-image" />}
            <p className="post-description">{post.description}</p>
        </div>
    );
}

export default OnePost;