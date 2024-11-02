import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};
