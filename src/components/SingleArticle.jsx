import React, { useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getSingleArticle, getComments } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import formatCreatedAt from '../utils/formatCreatedAt';
import { Link } from 'react-router-dom';
// ADD IS LOADING TO THIS PAGE

const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(article_id, '<<< params')

    useEffect(() => {
        getSingleArticle(article_id).then((articleFromAPI) => {   
            console.log(articleFromAPI);
            setSingleArticle(articleFromAPI);
            getComments(article_id).then((commentsFromAPI) => {
                console.log(commentsFromAPI);
                setComments(commentsFromAPI);
                setIsLoading(false);
            })
        })
    }, [article_id]);

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
                <p id='article_created_at'>
                            <p id='article_date'>{formatCreatedAt(singleArticle.created_at)[0]}</p>
                            <p id='article_time'>{formatCreatedAt(singleArticle.created_at)[1]}</p>
                        </p>
                <p>{singleArticle.topic}</p>  // link to filter by topic
                 <Link className='Link' to='/'>
                <p>{singleArticle.comment_count} comments</p> 
                </Link>
                // link to comments
                <p>{singleArticle.article_id} id</p>
                {comments.map((comment) => {
                    return (
                        <div className='Comment' key={comment.comment_id}>
                            <h4 id=''>{comment.author}</h4>
                            <p id=''>{comment.body}</p>
                            <p id='comment_created-at'>
                                <p id='comment_date'>{formatCreatedAt(comment.created_at)[0]}</p>
                                <p id='comment_time'>{formatCreatedAt(comment.created_at)[1]}</p>
                            </p>
                            <h4 id=''>{comment.votes}</h4>
                        </div >
                      
                    )
                })}
                
                    {
                    console.log(singleArticle, '<<< singlearticle')
                }
                    
            </div>
            <p>single article</p>
        </div>)
}

export default SingleArticle;