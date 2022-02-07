import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Nav from './Nav';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles().then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
        });
    }, []);

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