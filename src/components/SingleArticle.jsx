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
        console.log(comments.style.visibility)
        if (comments.style.visibility === 'hidden') {
            comments.style.visibility = 'visible';
        } else {
            comments.style.visibility = 'hidden';
        }
    }

    return isLoading ? <p>loading ...</p> : (
        <div id = 'single-article'>
            <div className='header-date'>
              <Header />  
              <Date />
            </div>
            <Nav />
            {/* <a href='#bottom'>Click here to see the content below.</a> */}
            <div id = 'single-article'>
                <h2>{singleArticle.title}</h2>
                <p>{singleArticle.body}</p>
                <p>{singleArticle.author}</p> // link to user's page
                <p>{singleArticle.votes}</p>  // button to add to votes
                <p id='article_created_at'>
                            <p id='article-date'>{formatCreatedAt(singleArticle.created_at)[0]}</p>
                            <p id='article-time'>{formatCreatedAt(singleArticle.created_at)[1]}</p>
                        </p>
                <p>{singleArticle.topic}</p>  // link to filter by topic
                <button id='show-comments'className='link' onClick={changeCommentVisibility}><p>{singleArticle.comment_count} comments</p></button>
                <div id='comments' >
                {comments.map((comment) => {
                    return (
                        <div id='single-comment' key={comment.comment_id}>
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
                </div>    
            </div>
            <a id='bottom'>single article</a>
        </div>)
}

export default SingleArticle;