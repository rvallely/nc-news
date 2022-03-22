import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Date from '../General/Date';
import Header from '../General/Header';
import Nav from '../General/Nav';
import UserDisplay from '../General/UserDisplay';
import { deleteComment, getCommentsByUser } from '../../utils/api';
import formatCreatedAt from '../../utils/formatCreatedAt';

const UserComments = () => {
    const user = useContext(UserContext);
    const username = user.loggedInUser.username;
    const [ userComments, setUserComments ] = useState([]);
    const [ titles, setTitles ] = useState([])
    const [ isPending, setIsPending ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        getCommentsByUser(username).then((commentsFromAPI) => {
            setUserComments(commentsFromAPI);
            setIsLoading(false);
        });
    }, [username]);

    const removeComment = (comment_id) => {
        const id = comment_id;
        setIsPending(true);
        deleteComment(id).then((data) => {
            setIsPending(false);
            navigate('/user_feedback', {msg: 'comment deleted'});
        });
    }
    
    return  isLoading ? <p>loading ...</p> : 
    ( 
        <div id='user-comments' key={`${username}_comments`}>
            <div key='header-date' className='header-date'>
              <Header />  
              <Date />
            </div>
            <UserDisplay /> 
            <Nav />
            <div key={`${username}-comments`}>
                <h2 className='article-list-user-title' key={`${username}title`} >{username}'s comments</h2>
                <ul className='article-list'>
                    {userComments.map(function(userComment) {
                        return (
                            <div className='article-list-item' key={userComment.id}>
                                <Link className='link' key={userComment.article_id} to={`/articles/${userComment.article_id}`}>
                                    <h3  className='article-list-title' key={`${userComment.id}-go-to-article`}>Go to article</h3>
                                </Link>
                                <div className='article-list-created_at'>
                                    <p className='article-list-created_at-e' key={`${userComment.id}-date`}>{formatCreatedAt(userComment.created_at)[0]}</p>
                                    <p className='article-list-created_at-e' key={`${userComment.id}-time`}>{formatCreatedAt(userComment.created_at)[1]}</p>
                                </div>
                                <h4 className='article-list-body' key={`${userComment.id}-body`} >{userComment.body}</h4>
                                <p className='article-list-votes' key={`${userComment.id}-votes`}>{userComment.votes} &#128077;</p>
                                <button 
                                 className='article-list-delete'
                                 key={`${username}-delete-comment`}
                                 onClick={() => removeComment(userComment.comment_id)}>&#128465;
                                </button>
                        </div>
                       )
                    })} 
                </ul>
            </div>
        </div>
    )
}

export default UserComments;

