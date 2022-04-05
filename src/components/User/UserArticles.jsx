import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Date from '../General/Date';
import Header from '../General/Header';
import Nav from '../General/Nav';
import SortBy from '../Articles/SortBy';
import UserDisplay from '../General/UserDisplay';
import { deleteArticleContent, getArticlesByUser } from '../../utils/api';
import formatCreatedAt from '../../utils/formatCreatedAt';

const UserArticles = () => {
    const user = useContext(UserContext);
    const username = user.loggedInUser.username;
    const [ userArticles, setUserArticles ] = useState([]);
    const [ isPending, setIsPending ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const searchSort_by = searchParams.get('sort_by')
    const searchOrder = searchParams.get('order')

    useEffect(() => {
        getArticlesByUser(username, searchSort_by, searchOrder).then((articlesFromAPI) => {
            setUserArticles(articlesFromAPI);
            setIsLoading(false);
        });
    }, [username, searchSort_by, searchOrder]);

    const removeArticleContent = (article_id) => {
        const id = article_id;
        setIsPending(true);
        deleteArticleContent(id).then((data) => {
            setIsPending(false);
            navigate('/user_feedback', { msg: 'article deleted'});
        });
    }

    const confirmRemoval = (userArticle) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            removeArticleContent(userArticle.article_id);
        } 
    }
    return  isLoading ? <p>loading ...</p> : 
    ( 
        <div id='user-articles' key={`${username}-articles`}>
            <div className='header-date'>
              <Header />  
              <Date />
              <UserDisplay /> 
        </div>
            <Nav />
            <SortBy />
            <div key={`${username}-articles`}>
                <h2 className='article-list-user-title' key={`${username}`} >{username}'s articles</h2>
                <ul className='article-list'>
                {userArticles.map(function(userArticle) {
                    if (userArticle.title !== 'Article does not exist') {
                        return (
                            <div className='article-list-item' key={userArticle.article_id}>
                                <Link className='link' key={`${userArticle.article_id}-id`} to={`/articles/${userArticle.article_id}`}>
                                    <h3 className='article-list-title' key={userArticle.title}>{userArticle.title}</h3>
                                </Link>
                                <div className='article-list-created_at'>
                                <p className='article-list-created_at-e' key={`${userArticle.id}-date`}>{formatCreatedAt(userArticle.created_at)[0]}</p>
                                <p className='article-list-created_at-e' key={`${userArticle.id}-time`}>{formatCreatedAt(userArticle.created_at)[1]}</p>
                                </div>
                                <Link className = 'link'  key={userArticle.id} to={`/articles/${userArticle.article_id}`}>
                                    <p className='article-list-comment-link'>{userArticle.comment_count} comments</p>
                                </Link>
                                <p className='article-list-votes' key={`${userArticle.id}-votes`}>{userArticle.votes} &#128077;</p>
                                <button 
                                  className='article-list-delete'
                                  key={`${username}-delete-article`}
                                  onClick={() => confirmRemoval(userArticle)}>&#128465;
                                </button> 
                            </div>
                        )
                    }
                })}
                </ul>
            </div>
        </div>
    )
}

export default UserArticles;