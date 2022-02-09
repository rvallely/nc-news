import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getTopics } from '../utils/api';
import capitaliseFirstLetter from '../utils/capitaliseFirstLetter';

const Nav = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);
    

    return (
        <nav className='Nav'>
            <Link className='Nav_item' key='home' to='/'>Home</Link>
            {topics.map((topic) => {
                return <Link className='Nav_item' key ={topic.slug} to={`/topics/${topic.slug}`}>{capitaliseFirstLetter(topic.slug)}</Link>
            })}
            <Link className='Nav_item' key='user' to='/user'>User</Link>
        </nav>
    )
}

export default Nav;