import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Nav from './Nav';
import { useParams } from 'react-router-dom';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const { topic_slug } = useParams();

    useEffect(() => {
        getArticles(topic_slug).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
        });
    }, [topic_slug]);

    return (
        <div>
            <Nav />
            <h1>Articles</h1>
            <ul>
              {articles.map((article) => {
                console.log(article, '<<< article')
                return (
                    <li className='article_list_item' key={article.article_id}> 
                        <h3>{article.title}</h3>
                        <h4>{article.author}</h4>
                        <p>{article.comment_count}</p>      
                        <p>{article.created_at}</p>
                        <p>{article.votes}</p>              
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Articles;