    import React, { useState, useEffect, useRef } from 'react';
    import SockJS from 'sockjs-client';
    import { Stomp } from '@stomp/stompjs';
    import axios from 'axios';
    import { useAuth } from '../context/AuthContext';

    const API_URL = 'http://localhost:8080';
    function Messages() {
        const { authData } = useAuth();
        const username=localStorage.getItem("username")
        let stompClient=null
        const [onlineUsers, setOnlineUsers] = useState([])


        useEffect(()=>{
            if(username){
                console.log(username)
                const socket = new SockJS('http://localhost:8080/ws');
                stompClient=Stomp.over(socket)
                stompClient.connect({}, onConnected, onError);
            }
        },[])

        function onConnected() {
            stompClient.subscribe(`/user/${username}/queue/messages`, onMessageReceived);
            stompClient.subscribe(`/user/public`, onMessageReceived);

            // register the connected user
            stompClient.send("/app/user.addUser",
                {},
                JSON.stringify({username: username, status: 'ONLINE'})
            );
            findAndDisplayConnectedUsers()
        }

        async function findAndDisplayConnectedUsers() {
            try {
                const response = await axios.get(`${API_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${authData.token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setOnlineUsers(response.data);


            } catch (error) {
                console.error("Error response:", error.response ? error.response.data : error.message);
                throw new Error('Failed to retrieve posts');
            }

        }
        function onError() {
            console.log("Greska websocket")
        }

        async function onMessageReceived(payload) {
            findAndDisplayConnectedUsers()
        }
        return (
            <div>
                <h1>Stranica poruke korisnika {username}</h1>
            <div>
                <h2>Online korisnici:</h2>
                <ul>
                    {onlineUsers
                        .filter((user) => user.username !== username) // Dodato: filtriramo korisnike
                        .map((user) => (
                            <li key={user.username}>{user.username}</li>
                        ))}
                </ul>
            </div>
            </div>
        );
    }

    export default Messages;
