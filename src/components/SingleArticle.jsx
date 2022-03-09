import React, { useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getSingleArticle, getComments } from '../utils/api';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import formatCreatedAt from '../utils/formatCreatedAt';
import { Link } from 'react-router-dom';
import Votes from './Votes';
import capitaliseFirstLetter from '../utils/capitaliseFirstLetter';

const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSingleArticle(article_id).then((articleFromAPI) => {   
            setSingleArticle(articleFromAPI);
            getComments(article_id).then((commentsFromAPI) => {
                setComments(commentsFromAPI);
                setIsLoading(false);
            })
        })
    }, [article_id]);

    const changeCommentVisibility = () => {
        const comments = document.getElementById('comments');
        
        if (comments.style.visibility !== 'visible') {
          comments.style.visibility = 'visible';
        } else {
            comments.style.visibility = 'hidden';
        }
    }

    return isLoading ? <p>loading ...</p> : (
        <div id = 'single-article'>
            {/* <div className='header-date'>
              <Header />  
              <Date />
            </div>*/}
            <Nav /> 
            <div id = 'single-article'>
                <h2>{singleArticle.title}</h2>
                <p>{singleArticle.body}</p>
                <p>{singleArticle.author}</p>
                <div id='votes'>
                    <p>{singleArticle.votes}</p>
                    <Votes article_id={singleArticle.article_id} votes={singleArticle.votes}/>
                </div> // link to user's page
                <div id='article_created_at'>
                            <p id='article-date'>{formatCreatedAt(singleArticle.created_at)[0]}</p>
                            <p id='article-time'>{formatCreatedAt(singleArticle.created_at)[1]}</p>
                </div>
                <Link className='link' key ={singleArticle.topic} to={`/topics/${singleArticle.topic}`}><p>{capitaliseFirstLetter(singleArticle.topic)}</p></Link> 
                <button id='show-comments'className='link' onClick={changeCommentVisibility}><p>{singleArticle.comment_count} comments</p></button>
                <div id='comments' style={{visibility:'hidden'}}>
                {comments.map((comment) => {
                    return (
                        <div id='single-comment' key={comment.comment_id}>
                            <h4 id=''>{comment.author}</h4>
                            <p id=''>{comment.body}</p>
                            <div id='comment_created-at'>
                                <p id='comment-date'>{formatCreatedAt(comment.created_at)[0]}</p>
                                <p id='comment-time'>{formatCreatedAt(comment.created_at)[1]}</p>
                            </div>
                            <h4 id='comment-votes'>{comment.votes}</h4>
                        </div >
                    )
                })}
                </div>    
            </div>
        </div>
    )
}

export default SingleArticle;