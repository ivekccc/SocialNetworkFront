import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAllPosts = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/allPosts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error response:", error.response ? error.response.data : error.message);
        throw new Error('Failed to retrieve posts');
    }
};
