import React, { useEffect } from 'react';
import { useState } from 'react';
import { getArticles } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import formatCreatedAt from '../utils/formatCreatedAt';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import SortBy from './SortBy';
import Queries from './Queries';
import { useSearchParams } from 'react-router-dom'




const Articles = () => {

    const [articles, setArticles] = useState([]);
    const { topic_slug } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    const searchSort_by = searchParams.get('sort_by')
    const searchOrder = searchParams.get('order')
    console.log('topic is', searchTopic)
    console.log('sort_by is', searchSort_by)
    console.log('order is', searchOrder)
    console.log('The topic slug is ', topic_slug)
    let topic = '';
    if (topic_slug) {
        topic = topic_slug;
    }
    if (searchTopic) {
        topic = searchTopic;
    }
    useEffect(() => {
        getArticles(topic, sortBy).then((articlesFromAPI) => {
            setArticles(articlesFromAPI);
            setIsLoading(false);
        });
    }, [topic_slug, sortBy]);

    return isLoading ? <p>loading ...</p> : (
        <div>
            {/* <div className='header-date'>
              <Header />  
              <Date />
            </div> */}
            <Nav />
            <Queries />
            {/* <p style={{margin: '70px', border: 'solid', borderWidth: '2px'}}>{JSON.stringify(location, null, 2)}</p>
            {console.log('The location: ', location)} */}
            <SortBy setSortBy={setSortBy}/>
            
            {/* <p>{location.articles}</p> */}
            <ul className='article-list'>
                {/* {console.log(articles, '<<< articles')} */}
                {/* {const sortedArticles = [...articles].sort((a, b) => a.comment_count-b.comment_count)} */}
              {articles.map((article) => {

                return (
                    <li className='article-list-item' key={article.article_id}> 
                        <Link className='link' key={article.article_id} to={`/articles/${article.article_id}`}>
                            <h3 id='article-title'>{article.title}</h3>
                        </Link>
                        <h4 id='article-author'>{article.author}</h4>
                        {/* <img src='https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953' alt = 'avatar'/> */}
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