import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';
import { getCommentsByUser } from '../utils/api';
import formatCreatedAt from '../utils/formatCreatedAt';

const UserComments = () => {
    const { loggedInUser } = useContext(UserContext);
    const username = loggedInUser.username;
    const [ userComments, setUserComments ] = useState([]);
    useEffect(() => {
        getCommentsByUser(username).then((commentsFromAPI) => {
            setUserComments(commentsFromAPI);
            console.log(userComments);   
        })
    }, [username]);
    

    return  ( <div key={`${username}-comments`}>
                 <h2>{username}'s comments</h2>
                 {console.log(userComments)}
                 {/* <p>{userComments[0].body}</p> */}
                 {userComments.map(function(userComment) {
                     return (
                         <div key={userComment.id}>
                             <h4 className='comment-body' key={userComment} >{userComment.body}</h4>
                             <p className='comment-date'>{formatCreatedAt(userComment.created_at)[0]}</p>
                             <p className='comment-time'>{formatCreatedAt(userComment.created_at)[1]}</p>
                             <p className='comment-votes'>{userComment.votes} &#128077;</p>
                             <button>&#128465;</button>
                         </div>
                     )
                 })
                }
                
              </div>
    )
}

export default UserComments;

