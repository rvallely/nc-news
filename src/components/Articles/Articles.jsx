import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom'
import Date from '../General/Date';
import Error from '../General/Error';
import Header from '../General/Header';
import Nav from '../General/Nav';
import SortBy from './SortBy';
import UserDisplay from '../General/UserDisplay';
import { checkSortByValid } from '../../utils/checkValid';
import formatCreatedAt from '../../utils/formatCreatedAt';
import { getArticles } from '../../utils/api';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);

    const searchTopic = searchParams.get('topic')
 
    useEffect(() => {

        getArticles(searchTopic, sortBy).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
            setIsLoading(false);
            setError(null);
        })
        .catch((err) => {
            setError(err);
            console.log('ERROR ERROR')
            setIsLoading(false);
        });
    }, [sortBy, searchTopic]);

    if (isLoading) {
        return <p> loading ...</p>
    }
    else {
        if (error) {
            return (
                <div>
                    <Error message={error.response.data.msg} status={error.response.status}/>
                </div>
            )
        }
        else if (!error) {
            return (
                <div>
                    <div className='header-date'>
                      <Header />  
                      <Date />
                    </div>
                    <UserDisplay /> 
                    <Nav />
                    <SortBy setSortBy={setSortBy}/>
            
                    <ul className='article-list'>
                        {articles.map((article) => {
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
                        })}
                    </ul>
                </div>
            )
        }   
    }
}

export default Articles;