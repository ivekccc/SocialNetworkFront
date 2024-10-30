import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/userService';
import './Profile.css';

function Profile() {
    const { authData } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(authData.token);
                setUserProfile(data);
                console.log(data.profileImageUrl)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, [authData.token]);

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    if (!userProfile) {
        return <div className="loading-container">Učitavanje...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-cover">
                    <div className="profile-image-container">
                        {userProfile.profileImageUrl ? (
                            <img
                                src={userProfile.profileImageUrl}
                                alt={`${userProfile.name}'s profile`}
                                className={`profile-image ${imageLoading ? 'loading' : ''}`}
                                onLoad={() => setImageLoading(false)}
                                onError={(e) => {
                                    setImageLoading(false);
                                    e.target.onerror = null;
                                    e.target.src = 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/profile-images/default-avatar.png';
                                }}
                            />
                        ) : (
                            <div className="profile-image-placeholder">
                                {userProfile.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>

                <div className="profile-info">
                    <h1>{userProfile.name} {userProfile.lastname}</h1>
                    <p className="username">@{userProfile.username}</p>
                    <button className="edit-profile-btn">Izmeni profil</button>
                </div>
            </div>

            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-number">0</span>
                    <span className="stat-label">Objava</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{userProfile.followersCount}</span>
                    <span className="stat-label">Pratilaca</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{userProfile.followingCount}</span>
                    <span className="stat-label">Prati</span>
                </div>
            </div>

            <div className="profile-details">
                <div className="details-card">
                    <h2>O meni</h2>
                    <div className="detail-item">
                        <i className="fas fa-envelope"></i>
                        <span>{userProfile.email}</span>
                    </div>
                    <div className="detail-item">
                        <i className="fas fa-user-tag"></i>
                        <span>{userProfile.role}</span>
                    </div>
                    {userProfile.bio && (
                        <div className="detail-item bio">
                            <i className="fas fa-info-circle"></i>
                            <span>{userProfile.bio}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;