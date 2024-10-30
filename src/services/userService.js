const API_URL = 'http://localhost:8080';

export const getProfile = async (token) => {
    console.log(token)
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
};

export const searchUsers = async (query, token) => {
    console.log("Pozivam pretragu sa:", query, token);
    const response = await fetch(`${API_URL}/users/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    console.log("Status odgovora:", response.status);
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error('Failed to search users');
    }

    return await response.json();
};

export const followUser = async (userId, token) => {
    const response = await fetch(`${API_URL}/users/${userId}/follow`, {
        method: 'POST',
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
};
