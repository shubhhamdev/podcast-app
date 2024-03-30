import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header/Header';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Button from '../components/Common/Button/Button';
import Loader from '../components/Common/Loader/Loader';
import PodcastCard from '../components/Podcasts/PodcastCard';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import './Style.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const user = useSelector((state) => state.user.user);
    const [userPodcasts, setUserPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserPodcasts = async () => {
            if (user!=null) {
                try {
                    const q = query(collection(db, 'podcasts'), where('createdBy', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    const userPodcastsData = [];
                    querySnapshot.forEach((doc) => {
                        userPodcastsData.push({ id: doc.id, ...doc.data() });
                    });
                    setUserPodcasts(userPodcastsData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user podcasts:', error);
                    setLoading(false);
                }
            }
        };
        
        fetchUserPodcasts();
    }, [user]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
                toast.success("Sign-out successful.");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div>
            <Header />

            {user ? (
                <div className="input-wrapper space">
                    <h1>Profile</h1>
                    <div className="profile-container">
                        <img src={user.profileImageUrl} alt="Profile" className='profile-card' />
                        <div className="profile-left">
                            <h1>{user.name}</h1>
                            <p>{user.email}</p>
                            <p>{user.uid}</p>
                            <Button text="Logout" onClick={handleLogout} style={{ width:"200px", marginLeft: 0, fontSize: "20px" }} />
                        </div>
                    </div>
                    <div className="your-podcasts">
                        <h2>Your Podcasts</h2>
                        {loading ? (
                            <Loader />
                        ) : userPodcasts.length > 0 ? (
                            <div className='podcasts-flex'>
                                {userPodcasts.map((podcast) => (
                                    <PodcastCard key={podcast.id} id={podcast.id} title={podcast.title} displayImage={podcast.displayImage} />
                                ))}
                            </div>
                        ) : (
                            <p>No podcasts found.</p>
                        )}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Profile;