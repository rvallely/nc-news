import React, { useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getSingleArticle, getComments } from '../utils/api';
import Nav from './Nav';
import formatCreatedAt from '../utils/formatCreatedAt';
import { Link } from 'react-router-dom';
import ArticleVotes from './ArticleVotes';
import capitaliseFirstLetter from '../utils/capitaliseFirstLetter';
import Error from './Error';
import CommentVotes from './CommentVotes';

const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSingleArticle(article_id).then((articleFromAPI) => {   
            setSingleArticle(articleFromAPI);
            getComments(article_id).then((commentsFromAPI) => {
                setComments(commentsFromAPI);
                setIsLoading(false);
            })
        }).catch((err) => {
            setError({ err });
            setIsLoading(false);
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

    if (isLoading) {
        return <p> loading ...</p>
    }
    else {
        if (error) {
            return <Error message={error.err.response.data.msg} status={error.err.response.status} />;
        }
        else if (!error) {
            if (singleArticle.title === 'Article does not exist') {
                return ( 
                    <div id = 'single-article'>
                        <Nav /> 
                        <h2>{singleArticle.title}</h2>
                        <p className='single-article-body'>{singleArticle.body}</p>
                    </div> 
                )
            } else {
                return (
                    <div id = 'single-article'>
                        <Nav /> 
                        <div id = 'single-article'>
                            <h2>{singleArticle.title}</h2>
                            <p className='single-article-body'>{singleArticle.body}</p>
                            <div className='single-article-details'>
                            <p>{singleArticle.author}</p>
                            <div id='votes'>
                                <ArticleVotes article_id={singleArticle.article_id} votes={singleArticle.votes}/>
                            </div> 
                            <div id='article_created_at'>
                                <p id='article-date'>{formatCreatedAt(singleArticle.created_at)[0]}</p>
                                <p id='article-time'>{formatCreatedAt(singleArticle.created_at)[1]}</p>
                            </div>
                            <Link className='link' key ={singleArticle.topic} to={`/topics/${singleArticle.topic}`}><p>{capitaliseFirstLetter(singleArticle.topic)}</p></Link> 
                            <button id='show-comments'className='link' onClick={changeCommentVisibility}><p>{singleArticle.comment_count} comments</p></button>
                            <Link key={`${article_id}-post-comment`} className='link' to={`/articles/${singleArticle.article_id}/post_comment`}><p>Post a comment</p></Link>
                        </div>
                        <div id='comments' style={{visibility:'visible'}}>
                            {comments.map((comment) => {
                                return (
                                    <div id='single-comment' key={comment.comment_id}>
                                        <h4 id=''>{comment.author}</h4>
                                        <p id=''>{comment.body}</p>
                                        <div id='comment_created-at'>
                                            <p id='comment-date'>{formatCreatedAt(comment.created_at)[0]}</p>
                                            <p id='comment-time'>{formatCreatedAt(comment.created_at)[1]}</p>
                                        </div>
                                        <CommentVotes comment_id={comment.comment_id} votes={comment.votes}/>
                                    </div >
                                )
                            })}
                        </div>    
                    </div>
                </div>
                )
            }
        }
    }
}

export default SingleArticle;