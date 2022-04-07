import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import capitaliseFirstLetter from '../../utils/capitaliseFirstLetter';
import { getTopics } from '../../utils/api';

const Nav = ({ underline }) => {
    if (underline === null) {
        underline = 'home';
    }
    
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);

    return (
        <nav className='Nav'>
            <Link className={underline === 'home' ? 'Nav-item-active': 'Nav-item'} id='home' key='home' exact to='/articles'>Home |</Link>
                {topics.map((topic) => {
                    return (
                        <Link className={underline === topic.slug ? 'Nav-item-active': 'Nav-item'} id={topic.slug} key ={topic.slug} to={`/articles?topic=${topic.slug}`}>
                            {`${capitaliseFirstLetter(topic.slug)} |`}
                        </Link>
                    )
                })}
            <Link className={underline === 'user' ? 'Nav-item-active': 'Nav-item'} id='Nav-item-user' key='user' to='/user'>User Area</Link>
        </nav>
    )
  
}

export default Nav;