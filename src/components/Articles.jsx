import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import formatCreatedAt from '../utils/formatCreatedAt';
import { HashLink as Link } from 'react-router-hash-link';
import SortBy from './SortBy';
import Queries from './Queries';
import { useSearchParams } from 'react-router-dom'




const Articles = () => {

    const [articles, setArticles] = useState([]);
    const { topic_slug } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    // const [sortBy, setSortBy] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    const searchSort_by = searchParams.get('sort_by')
    const searchOrder = searchParams.get('order')
//    console.log('The state is ', sortBy)
    let topic = '';
    if (searchTopic) {
        topic = searchTopic;
    }

    let sort_by = '';
    if (searchSort_by && !searchOrder) {
        sort_by = `sort_by=${searchSort_by}`;
    } 
    if (searchSort_by && searchOrder) {
        sort_by = `sort_by=${searchSort_by} order=${searchOrder}`;
    }
  
    useEffect(() => {
        getArticles(topic, sort_by).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
            setIsLoading(false);
        });
    }, [topic, sort_by]);

    return isLoading ? <p>loading ...</p> : (
        <div>
            <Nav /*setSortBy={setSortBy}*//>
            <SortBy /*setSortBy={setSortBy}*//>
            
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

export default Articles;