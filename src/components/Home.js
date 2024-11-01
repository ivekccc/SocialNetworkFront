import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllPosts } from '../services/PostService';
import PostList from './PostList';

function Home() {
    const { authData } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getAllPosts(authData.token);
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [authData.token]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="home-container">
            <PostList posts={posts} />
        </div>
    );
}

export default Home;
