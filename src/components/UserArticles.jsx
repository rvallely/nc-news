import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import Nav from './Nav';
import { deleteArticle, getArticlesByUser, getTitle, getTitles } from '../utils/api';
import formatCreatedAt from '../utils/formatCreatedAt';




const UserArticles = () => {
    const user = useContext(UserContext);
    const username = user.loggedInUser.username;
    const [ userArticles, setUserArticles ] = useState([]);
    const [ titles, setTitles ] = useState([])
    const [ isPending, setIsPending ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        getArticlesByUser(username).then((articlesFromAPI) => {
            setUserArticles(articlesFromAPI);
            setIsLoading(false);
        });
    }, [username]);

    // const removeArticle = (article_id) => {
    //     console.log(' in remove article')
    //     const id = article_id;
    //     setIsPending(true);
    //     deleteArticle(id).then((data) => {
    //         setIsPending(false);
    //         navigate('/user');
    //     });
    // }
    

    return  isLoading ? <p>loading ...</p> : ( 
        <div id='user-articles'>
            <Nav />
    <div key={`${username}-articles`}>
                 <h2 key={`${username}`} >{username}'s articles</h2>
                 
                 {userArticles.map(function(userArticle) {
                     console.log(userArticle)
                     return (
                         <div className='user-article' key={userArticle.id}>
                             {/* <h3>Some title</h3> */}
                             <Link className='link' key={userArticle.article_id} to={`/articles/${userArticle.article_id}`}>
                            <h3 id='article-title' className='title'>{userArticle.title}</h3>
                        </Link>
                             {/* {console.log(userarticle.article_id)} */}
                             <h4 className='user-article-body' key={`${userArticle.id}-body`} >{userArticle.body}</h4>
                             <p className='user-article-date' key={`${userArticle.id}-date`}>{formatCreatedAt(userArticle.created_at)[0]}</p>
                             <p className='user-article-time' key={`${userArticle.id}-time`}>{formatCreatedAt(userArticle.created_at)[1]}</p>
                             <p className='user-article-votes' key={`${userArticle.id}-votes`}>{userArticle.votes} &#128077;</p>
                             <button 
                                 key={`${username}-delete-article`}
                                 onClick={() => alert('cliked')}>&#128465;</button> 
                         </div>
                     )
                 })
                }
              </div>
              </div>
    )
}
//removeArticle(userArticle.article_id)

export default UserArticles;