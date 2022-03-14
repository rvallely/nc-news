import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getTopics } from '../utils/api';
import capitaliseFirstLetter from '../utils/capitaliseFirstLetter';
// import { useContext } from 'react';
// import { UserContext } from '../contexts/User';

const Nav = () => {
    // const userValues = useContext(UserContext);
    // console.log(userValues);
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);
    

    return (
        <nav className='Nav'>
            <Link className='Nav-item' key='home' to='/articles'>Home</Link>
            {topics.map((topic) => {
                // return <Link className='Nav-item' key ={topic.slug} to={`/topics/${topic.slug}`}>{capitaliseFirstLetter(topic.slug)}</Link>
                return <Link className='Nav-item' key ={topic.slug} to={`/articles?topic=${topic.slug}`}>{capitaliseFirstLetter(topic.slug)}</Link>
            })}
            <Link className='Nav-item' key='user' to='/user'>User</Link>
            {/* < div>
                <p>Logged in as: {userValues.loggedInUser.username}</p>
                <img src={userValues.loggedInUser.avatar_url} alt={userValues.loggedInUser.username}></img>
            </div> */}
        </nav>
    )
}

export default Nav;