import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Date from "../General/Date";
import Error from '../General/Error';
import Header from "../General/Header";
import Nav from '../General/Nav';
import UserDisplay from "../General/UserDisplay";
import capitaliseFirstLetter from '../../utils/capitaliseFirstLetter';
import { getTopics } from '../../utils/api';
import { postArticle } from '../../utils/api';

const PostArticleForm = () => {
    const user = useContext(UserContext);
    const username = user.loggedInUser.username;
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ topic, setTopic ] = useState('');
    const [ allTopics, setAllTopics ] = useState([]);
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setAllTopics(topicsFromAPI);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (topic === '') {
            alert('Please select a topic.');
        }
        if (topic !== '' ) {
            const newArticle = { author: username, title, body, topic };
            setIsPending(true);
            
            postArticle(newArticle).then((postedArticle) => {
                setIsPending(false);
                navigate(`/articles/${postedArticle.article_id}`);
            })
            .catch((err) => {
                setError(err);
            });
        }
    }
    if (error) {
        return <Error message={error.response.data.msg} status={error.response.status}/>
    }
    if (username === 'Log in') {
        return <Error message={'Please log in to post an article'} status={400}/>
    } else {
        return (
            <div className='form'>
            <div className='header-date'>
                    <Header />  
                    <Date />
                </div>
            <UserDisplay />
            <Nav />
            <h2>Post your article below:</h2>
            <form onSubmit={handleSubmit}>
                <input
                  required
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}>
                </input>
                <select
                  id='topic'
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  >
                      <option value='' selected disabled>Select a topic</option>
                    {allTopics.map((topic) => {
                        return (
                            <option value={topic.slug}>{capitaliseFirstLetter(topic.slug)}</option>
                        )
                    })}
                </select>
                <textarea
                  value={body}
                  placeholder='Write your article here...'
                  onChange={(e) => setBody(e.target.value)}>
                </textarea>
                <br></br>
                { !isPending && <button>Post</button>}
                { isPending && <button disabled>Posting article ...</button>}
            </form>
        </div>
        )

    }
}

export default PostArticleForm;