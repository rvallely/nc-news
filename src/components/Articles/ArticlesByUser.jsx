import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Date from '../General/Date';
import Header from '../General/Header';
import Nav from '../General/Nav';
import UserDisplay from '../General/UserDisplay';
import { deleteArticleContent, getArticlesByUser } from '../../utils/api';
import formatCreatedAt from '../../utils/formatCreatedAt';

const ArticlesByUser = (props) => {
    const username = useParams();
    const [ articlesByUser, setArticlesByUser ] = useState([]);
    const [ isPending, setIsPending ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate();
    console.log(username)
    console.log(username)
    useEffect(() => {
        getArticlesByUser(username).then((articlesFromAPI) => {
            setArticlesByUser(articlesFromAPI);
            setIsLoading(false);
        });
    }, [username]);

    return  isLoading ? <p>loading ...</p> : 
    ( 
        <div id='user-articles' key={`${username}-articles`}>
            <div className='header-date'>
              <Header />  
              <Date />
        </div>
        <UserDisplay /> 
            <Nav />
            <div key={`${username}-articles`}>
                <h2 key={`${username}`} >{username}'s articles</h2>
                 
                {articlesByUser.map(function(article) {
                    if (article.title !== 'Article does not exist') {
                        // return (
                        //     <div className='user-article' key={article.id}>
                        //         <Link className='link' key={article.article_id} to={`/articles/${article.article_id}`}>
                        //         <h3 id='article-title' className='title'>{article.title}</h3>
                        //         </Link>
                        //         <h4 className='user-article-body' key={`${article.id}-body`} >{article.body}</h4>
                        //         <p className='user-article-date' key={`${article.id}-date`}>{formatCreatedAt(article.created_at)[0]}</p>
                        //         <p className='user-article-time' key={`${article.id}-time`}>{formatCreatedAt(article.created_at)[1]}</p>
                        //         <p className='user-article-votes' key={`${article.id}-votes`}>{article.votes} &#128077;</p>
                        //     </div>
                        // )
                        return (
                            <li className='article-list-item' key={article.article_id}> 
                                <Link className='link' key={article.article_id} to={`/articles/${article.article_id}`}>
                                    <h3 id='article-title'>{article.title}</h3>
                                </Link>
                                <h4 id='article-author'>{article.author}</h4>
                                <Link className = 'link' to={`/articles/${article.article_id}#show-comments`}>{article.comment_count} comments</Link> 
                                <div id='article-created_at'>
                                   <p id='article-date'>{formatCreatedAt(article.created_at)[0]}</p>
                                   <p id='article-time'>{formatCreatedAt(article.created_at)[1]}</p>
                                </div>
                                <p id='article-votes'>{article.votes} &#128077;</p> 
                            </li>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default ArticlesByUser;