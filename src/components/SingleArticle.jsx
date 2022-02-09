import React, { useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getSingleArticle } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
// ADD IS LOADING TO THIS PAGE

const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    console.log(article_id, '<<< params')

    useEffect(() => {
        getSingleArticle(article_id).then((articleFromAPI) => {
            console.log(articleFromAPI);
            setSingleArticle(articleFromAPI);
            setIsLoading(false);
        })
    }, [article_id])
    return isLoading ? <p>loading ...</p> : (
        <div>
            <div className='header-date'>
              <Header />  
              <Date />
            </div>
            <Nav />
            <div>
                <h2>{singleArticle.title}</h2>
                <p>{singleArticle.body}</p>
                <p>{singleArticle.author}</p> // link to user's page
                <p>{singleArticle.votes}</p>  // button to add to votes
                <p>{singleArticle.comment_count}</p> // link to comments
                <p>{singleArticle.created_at}</p>  // format date
                <p>{singleArticle.topic}</p>  // link to filter by topic
                {
                    console.log(singleArticle, '<<< singlearticle')
                }
                    
            </div>
            <p>single article</p>
        </div>)
}

export default SingleArticle;