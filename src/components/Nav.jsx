import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getTopics } from '../utils/api';

const Nav = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);
    

    return (
        <nav className='Nav'>
            <Link key='home' to='/'>Home</Link>
            <Link key='articles' to='/articles'>All articles</Link>
            {topics.map((topic) => {
                return <Link key ={topic.slug} to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            })}
            <Link key='user' to='/user'>User</Link>
        </nav>
    )
}

export default Nav;