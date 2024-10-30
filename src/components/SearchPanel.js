import React, { useState } from 'react';
import { searchUsers } from '../services/userService';
import SearchResultItem from './SearchResultItem';
import { useAuth } from '../context/AuthContext';
import './SearchPanel.css';

function SearchPanel({ isOpen, onClose}) {
    const { authData } = useAuth();
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 2) {
            try {
                if (!authData.token) {
                    console.error('Token nije dostupan');
                    return;
                }

                const results = await searchUsers(query, authData.token);
                setSearchResults(results);
            } catch (error) {
                console.error('Greška prilikom pretrage:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className={`search-panel ${isOpen ? 'open' : ''}`}>
            <div className="search-header">
                <h3>Pretraga</h3>
                <button onClick={onClose} className="close-search">
                    <span className="material-icons">close</span>
                </button>
            </div>
            <div className="search-content">
                <div className="search-input-wrapper">
                    <span className="material-icons">search</span>
                    <input
                        type="text"
                        placeholder="Pretražite..."
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="search-results">
                    {searchResults.map(user => (
                        <SearchResultItem key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPanel;