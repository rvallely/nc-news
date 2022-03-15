import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { deleteComment, getCommentsByUser, getTitle, getTitles } from '../utils/api';
import formatCreatedAt from '../utils/formatCreatedAt';
import Nav from './Nav';
import { Link } from 'react-router-dom';

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
            // const comments_article_ids = [];
            // commentsFromAPI.forEach((comment) => comments_article_ids.push(comment.article_id));
            // console.log(comments_article_ids);
            // getTitles(comments_article_ids)
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
    

    return  isLoading ? <p>loading ...</p> : ( 
        <div id='user-comments'>
            <Nav />
    <div key={`${username}-comments`}>
                 <h2 key={`${username}title`} >{username}'s comments</h2>
                 
                 {userComments.map(function(userComment) {
                     return (
                         <div className='user-comment' key={userComment.id}>
                             {/* <h3>Some title</h3> */}
                             <Link className='link' key={userComment.article_id} to={`/articles/${userComment.article_id}`}>
                            <h3 id='article-title'>Go to article</h3>
                        </Link>
                             {/* {console.log(userComment.article_id)} */}
                             <h4 className='user-comment-body' key={`${userComment.id}-body`} >{userComment.body}</h4>
                             <p className='user-comment-date' key={`${userComment.id}-date`}>{formatCreatedAt(userComment.created_at)[0]}</p>
                             <p className='user-comment-time' key={`${userComment.id}-time`}>{formatCreatedAt(userComment.created_at)[1]}</p>
                             <p className='user-comment-votes' key={`${userComment.id}-votes`}>{userComment.votes} &#128077;</p>
                             <button 
                                 key={`${username}-delete-comment`}
                                 onClick={() => removeComment(userComment.comment_id)}>&#128465;</button>
                         </div>
                     )
                 })
                }
              </div>
              </div>
    )
}

export default UserComments;

