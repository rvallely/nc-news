import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const searchTopic = searchParams.get('topic')
    const searchSort_by = searchParams.get('sort_by')
    const searchOrder = searchParams.get('order')

    let sort_by = '';
    if (searchSort_by && !searchOrder) {
        sort_by = `sort_by=${searchSort_by}`;
    } 
    if (searchSort_by && searchOrder) {
        sort_by = `sort_by=${searchSort_by} order=${searchOrder}`; 
    }
 
    useEffect(() => {
        getArticles(searchTopic, sort_by).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
            setIsLoading(false);
            setError(null);
        })
        .catch((err) => {
            setError(err);
            setIsLoading(false);
        });
    }, [sort_by, searchTopic]);

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
                      <UserDisplay /> 
                    </div>
                    <Nav />
                    <SortBy />
                    <ul className='article-list'>
                        {articles.map((article) => {
                            if (article.title !== 'Article does not exist') {
                            return (
                                <li className='article-list-item' key={article.article_id}> 
                                    <Link className='link' key={`${article.article_id}-title`} to={`/articles/${article.article_id}`} >
                                        <h3 className='article-list-title'>{article.title}</h3>
                                    </Link>
                                    <div className='article-list-created_at'>
                                       <p className='article-list-created_at-e'>{formatCreatedAt(article.created_at)[0]}</p>
                                       <p className='article-list-created_at-e'>{formatCreatedAt(article.created_at)[1]}</p>
                                    </div>
                                    <Link className='link' key={`${article.article_id}-author`} to={`/articles/user/${article.author}`}>
                                        <h4 className='article-list-author'>{article.author}</h4>
                                    </Link>
                                    <HashLink className='link' to={`/articles/${article.article_id}#comments`}>
                                        <p className='article-list-comment-link'>{article.comment_count} comments</p>
                                    </HashLink>
                                    <p className='article-list-votes'>{article.votes} &#128077;</p> 
                                </li>
                            );
                            }
                        })}
                    </ul>
                </div>
            )
        }   
    }
}

export default Articles;