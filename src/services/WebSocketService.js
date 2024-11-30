import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
let stompClient = null;

const WebSocketService = {
    connect: (username, setOnlineUsers, token) => {
        const socket = new SockJS(`${API_URL}/ws`);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => onConnected(username, setOnlineUsers, token), onError);
    },

    disconnectUser: (username) => {
        if (stompClient) {
            console.log("Odjavljujem korisnika ", username);
            stompClient.send("/app/user.disconnectUser", {}, JSON.stringify({ username: username }));
        } else {
            console.log("stompClient nije povezan.");
        }
    },

    findAndDisplayConnectedUsers: async (setOnlineUsers, token) => {
        try {
            const response = await axios.get(`${API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setOnlineUsers(response.data);
        } catch (error) {
            console.error("Error response:", error.response ? error.response.data : error.message);
            throw new Error('Failed to retrieve users');
        }
    },

    notifyUserLogin: (username) => {
        if (stompClient) {
            stompClient.send("/app/user.addUser", {}, JSON.stringify({ username }));
        }
    }
};

const onConnected = (username, setOnlineUsers, token) => {
    stompClient.subscribe(`/user/${username}/queue/messages`, (payload) => onMessageReceived(payload, setOnlineUsers, token));
    stompClient.subscribe(`/topic/public`, (payload) => onMessageReceived(payload, setOnlineUsers, token));

    stompClient.send("/app/user.addUser",
        {},
        JSON.stringify({ username: username, status: 'ONLINE' })
    );
    WebSocketService.findAndDisplayConnectedUsers(setOnlineUsers,token)
};

const onMessageReceived = (payload, setOnlineUsers, token) => {
    WebSocketService.findAndDisplayConnectedUsers(setOnlineUsers, token);
};

const onError = () => {
    console.log("Greska websocket");
};

export default WebSocketService;
