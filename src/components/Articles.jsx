import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import formatCreatedAt from '../utils/formatCreatedAt';
//import { Link } from 'react-router-dom';
import SingleArticle from './SingleArticle';
import { HashLink as Link } from 'react-router-hash-link';

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
            <ul className='article-list'>
              {articles.map((article) => {

                return (
                    <li className='article-list-item' key={article.article_id}> 
                        <Link className='link' key={article.article_id} to={`/articles/${article.article_id}`}>
                            <h3 id='article-title'>{article.title}</h3>
                        </Link>
                        {/* <a href='#bottom'>Click here to see the content below.</a> */}
                        <h4 id='article-author'>{article.author}</h4>
                        {/* <img src='https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953' alt = 'avatar'/> */}
                        <Link to={`/articles/${article.article_id}#show-comments`}>{article.comment_count} comments</Link> 
                        <p id='article-created_at'>
                            <p id='article-date'>{formatCreatedAt(article.created_at)[0]}</p>
                            <p id='article-time'>{formatCreatedAt(article.created_at)[1]}</p>
                        </p>
                        <p id='article-votes'>{article.votes} &#128077;</p> 
                        {/* <button type='submit'><p>&#128077;</p></button>              */}
                    </li>
                );
            })}
            </ul>
            
        </div>
    )
}

export default Articles;