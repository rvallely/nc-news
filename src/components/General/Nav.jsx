import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import capitaliseFirstLetter from '../../utils/capitaliseFirstLetter';
import { getTopics } from '../../utils/api';

const Nav = (props) => {
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
                    return (
                        <Link className='Nav-item' key ={topic.slug} to={`/articles?topic=${topic.slug}`}>
                            {capitaliseFirstLetter(topic.slug)}
                        </Link>
                    )
                })}
            <Link className='Nav-item' key='user' to='/user'>User</Link>
        </nav>
    )
}

export default Nav;