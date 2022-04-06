import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import capitaliseFirstLetter from '../../utils/capitaliseFirstLetter';
import { getTopics } from '../../utils/api';

const Nav = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);

    const underline = (id) => {
        // console.log('clicked ', id);
        const selected = document.getElementById(id);
        const navElements = document.getElementsByClassName('Nav-item');
        for (let item in navElements) {
            if (navElements[item].id !== undefined && navElements[item].id !== selected.id) {
                let deselectedE = document.getElementById(navElements[item].id);
                deselectedE.style.textDecoration = 'none';
            }  
        }
        selected.style.textDecoration = 'underline';
    }

    return (
        <nav className='Nav'>
            <Link onClick={() => underline('home')} className='Nav-item' id='home' key='home' to='/articles'>Home |</Link>
                {topics.map((topic) => {
                    return (
                        <Link onClick={() => underline(topic.slug)} className='Nav-item' id={topic.slug} key ={topic.slug} to={`/articles?topic=${topic.slug}`}>
                            {`${capitaliseFirstLetter(topic.slug)} |`}
                        </Link>
                    )
                })}
            <Link onClick={() => underline('Nav-item-user')} className='Nav-item' id='Nav-item-user' key='user' to='/user'>User</Link>
        </nav>
    )
}

export default Nav;