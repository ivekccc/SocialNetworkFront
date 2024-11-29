import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Failed to fetch profile:", error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch profile');
    }
};

export const searchUsers = async (query, token) => {
    try {
        const response = await axios.get(`${API_URL}/users/search`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: { query }
        });

        return response.data;
    } catch (error) {
        console.error("Failed to search users:", error.response ? error.response.data : error.message);
        throw new Error('Failed to search users');
    }
};



export const followUser = async (sender, receiver, token) => {
    try {
        await axios.post('http://localhost:8080/notifications/follow', null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: { sender, receiver }
        });
    } catch (error) {
        console.error('Error sending follow notification:', error);
    }
};


export const getUserByUsername = async (username, token) => {
    try {
        const response = await axios.get(`${API_URL}/users/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Failed to fetch user by username:", error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch user by username');
    }
};
