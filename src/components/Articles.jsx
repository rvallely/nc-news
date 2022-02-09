import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import formatCreatedAt from '../utils/formatCreatedAt';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const { topic_slug } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArticles(topic_slug).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
            setIsLoading(false);
        });
    }, [topic_slug]);

    return isLoading ? <p>loading ...</p> : (
        <div>
            <div className='header-date'>
              <Header />  
              <Date />
            </div>
            <Nav />
            <ul>
              {articles.map((article) => {
                console.log(article, '<<< article')
                return (
                    <li className='article_list_item' key={article.article_id}> 
                        <h3 id='article_title'>{article.title}</h3>
                        <h4 id='article_author'>{article.author}</h4>
                        <p id='article_comment_count'>{article.comment_count} comments</p>      
                        <p id='article_created_at'>
                            <p id='article_date'>{formatCreatedAt(article.created_at)[0]}</p>
                            <p id='article_time'>{formatCreatedAt(article.created_at)[1]}</p>
                        </p>
                        <p id='article_votes'>{article.votes}</p> 
                        <button type='submit'><p>&#128077;</p></button>             
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Articles;