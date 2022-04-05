import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Date from '../General/Date';
import Header from '../General/Header';
import Nav from '../General/Nav';
import SortBy from './SortBy';
import UserDisplay from '../General/UserDisplay';
import { getArticlesByUser } from '../../utils/api';
import formatCreatedAt from '../../utils/formatCreatedAt';

const ArticlesByUser = () => {
    const { username } = useParams();
    const [ articlesByUser, setArticlesByUser ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchSort_by = searchParams.get('sort_by')
    const searchOrder = searchParams.get('order')

    useEffect(() => {
        getArticlesByUser(username, searchSort_by, searchOrder).then((articlesFromAPI) => {
            setArticlesByUser(articlesFromAPI);
            setIsLoading(false);
        });
    }, [username, searchSort_by, searchOrder]);

    return  isLoading ? <p>loading ...</p> : 
    ( 
        <div id='user-articles' key={`${username}-articles`}>
            <div className='header-date'>
              <Header />  
              <Date />
              <UserDisplay /> 
        </div>
            <Nav />
            <div key={`${username}-articles`}>
                <h2 className='article-list-user-title' key={`${username}`} >{username}'s articles</h2>
                <SortBy />
                <ul className='article-list'>
                {articlesByUser.map(function(article) {
                    if (article.title !== 'Article does not exist') {
                        return (
                            <li className='article-list-item' key={article.article_id}> 
                                <Link className='link' key={article.article_id} to={`/articles/${article.article_id}`}>
                                    <h3 className='article-list-title'>{article.title}</h3>
                                </Link>
                                <div className='article-list-created_at'>
                                   <p className='article-list-created_at-e'>{formatCreatedAt(article.created_at)[0]}</p>
                                   <p className='article-list-created_at-e'>{formatCreatedAt(article.created_at)[1]}</p>
                                </div>
                                <h4 className='article-list-author' id='article-author'>{article.author}</h4>
                                <Link className = 'link' to={`/articles/${article.article_id}#show-comments`}>
                                    <p className='article-list-comment-link'>{article.comment_count} comments</p>
                                </Link>
                                <p className='article-list-votes'>{article.votes} &#128077;</p> 
                            </li>
                        );
                    }
                })}
                </ul>
            </div>
        </div>
    )
}

export default ArticlesByUser;