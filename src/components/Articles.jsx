import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Nav from './Nav';
import { useParams } from 'react-router-dom';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const { topic_slug } = useParams();

    useEffect(() => {
       // console.log(topic_slug, '<<< params')
        getArticles(topic_slug).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
        });
    }, [topic_slug]);

    return (
        <div>
            <Nav />
            <h1>Articles</h1>
            {articles.map((article) => {
                return <p>{article.title}</p>
        })}
        </div>
    )
}

export default Articles;