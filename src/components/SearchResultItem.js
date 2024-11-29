import React from 'react';
import { followUser } from '../services/userService';
import { useAuth } from '../context/AuthContext';

function SearchResultItem({ user }) {

    const {authData}=useAuth()

    const handleFollow = async (receiver) => {
        try {
            if (!authData.token) {
                console.error('Token nije dostupan');
                return;
            }
            await followUser(authData.username,receiver, authData.token); // Pozivamo funkciju za zapračivanje
            console.log(`Zapratiо korisnika sa username: ${receiver}`);
        } catch (error) {
            console.error('Greška prilikom zapračivanja:', error);
        }
    };

    return (
        <div className="search-result-item">
            <img
                src={user.profileImageUrl || '/default-avatar.png'}
                alt={user.username}
                className="search-result-avatar"
            />
            <div className="search-result-info">
                <div className="search-result-name">{user.name} {user.lastname}</div>
                <div className="search-result-username">@{user.username}</div>
                <button onClick={() => handleFollow(user.username)} className="follow-button">
                    Zaprati
                </button>
            </div>
        </div>
    );
}

export default SearchResultItem;