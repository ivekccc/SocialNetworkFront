const API_URL = 'http://localhost:8080';
export const getAllPosts = async (token) => {
    const response = await fetch(`${API_URL}/allPosts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },

    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error('Failed to follow user');
    }
    const data = await response.json();
    return data;
};