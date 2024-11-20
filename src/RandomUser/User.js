import React, { useState, useEffect } from "react";
import styles from './User.module.scss';

import UserIcon from '../Assets/icons/user.svg';
import EmailIcon from '../Assets/icons/email.svg';
import CalendarIcon from '../Assets/icons/calendar.svg';
import LocationIcon from '../Assets/icons/map-location.svg';
import PhoneIcon from '../Assets/icons/call.svg';
import LockIcon from '../Assets/icons/locked.svg';


const RandomUser = () => {
    const [user, setUser] = useState(null);
    const [activeDetail, setActiveDetail] = useState("");

    const fetchRandomUser = async () => {
        const url = "https://randomuser.me/api/";
        try {
            const response = await fetch(url);
            const data = await response.json();
            setUser(data.results[0]);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchRandomUser();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    const details = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        dob: new Date(user.dob.date).toLocaleDateString(),
        location: `${user.location.city}, ${user.location.state}, ${user.location.country}`,
        phone: user.phone,
        password: user.login.password,
    };

    return (
        <div className={styles['random-user-container']}>
            <div className={styles['user-card-frame']}>
                <div className={styles['random-user-card']}>
                    <img
                        className={styles['user-image']}
                        src={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                    />
                    <p className={styles['user-detail-label']}>My {activeDetail} is</p>
                    <h2 className={styles['user-detail-value']}>{details[activeDetail]}</h2>
                    <div className={styles['icon-container']}>
                        <ul className={styles['icon-list']}>
                            <li
                                onMouseEnter={() => setActiveDetail("name")}
                                className={styles['icon-item']}
                            >
                                <img src={UserIcon} alt="User Icon" className={styles['icon-image']} />
                            </li>
                            <li
                                onMouseEnter={() => setActiveDetail("email")}
                                className={styles['icon-item']}
                            >
                                <img src={EmailIcon} alt="Email Icon" className={styles['icon-image']} />
                            </li>
                            <li
                                onMouseEnter={() => setActiveDetail("dob")}
                                className={styles['icon-item']}
                            >
                                <img src={CalendarIcon} alt="Calendar Icon" className={styles['icon-image']} />
                            </li>
                            <li
                                onMouseEnter={() => setActiveDetail("location")}
                                className={styles['icon-item']}
                            >
                                <img src={LocationIcon} alt="Location Icon" className={styles['icon-image']} />
                            </li>
                            <li
                                onMouseEnter={() => setActiveDetail("phone")}
                                className={styles['icon-item']}
                            >
                                <img src={PhoneIcon} alt="Phone Icon" className={styles['icon-image']} />
                            </li>
                            <li
                                onMouseEnter={() => setActiveDetail("password")}
                                className={styles['icon-item']}
                            >
                                <img src={LockIcon} alt="Lock Icon" className={styles['icon-image']} />
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RandomUser;