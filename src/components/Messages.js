import React, { useContext, useEffect } from 'react';
import { OnlineUsersContext } from '../context/OnlineUsersContext';

function Messages() {
    const onlineUsers = useContext(OnlineUsersContext);
    const username = localStorage.getItem("username");



    return (
        <div>
            <h1>Stranica poruke korisnika {username}</h1>
            <div>
                <h2>Online korisnici:</h2>
                <ul>
                    {Array.isArray(onlineUsers) ? (
                        onlineUsers
                            .filter((user) => user.username !== username)
                            .map((user) => (
                                <li key={user.username}>{user.username}</li>
                            ))
                    ) : (
                        <li>Nema online korisnika.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Messages;
