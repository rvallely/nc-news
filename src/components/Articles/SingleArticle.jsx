import React, { useEffect, useState, useContext  }  from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import ArticleVotes from './ArticleVotes';
import CommentVotes from './CommentVotes';
import Date from '../General/Date';
import Error from '../General/Error';
import Header from '../General/Header';
import Nav from '../General/Nav';
import PostCommentLink from './PostCommentLink';
import SortComments from './SortComments';
import UserDisplay from '../General/UserDisplay';
import capitaliseFirstLetter from '../../utils/capitaliseFirstLetter';
import formatCreatedAt from '../../utils/formatCreatedAt';
import { getSingleArticle, getComments } from '../../utils/api';



const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchSort_by = searchParams.get('sort_by');
    const searchOrder = searchParams.get('order');

    useEffect(() => {
        getSingleArticle(article_id).then((articleFromAPI) => {   
            setSingleArticle(articleFromAPI);
            getComments(article_id, searchSort_by, searchOrder).then((commentsFromAPI) => {
                setComments(commentsFromAPI);
                setIsLoading(false);
            })
        }).catch((err) => {
            setError({ err });
            setIsLoading(false);
        })
      
    }, [article_id, searchSort_by, searchOrder]);

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
            return (
                <div>
                    <Error message={error.err.response.data.msg} status={error.err.response.status} />
                </div>
            )  
        }
        else if (!error) {
            if (singleArticle.title === 'Article does not exist') {
                return ( 
                    <div id = 'single-article'>
                        <div className='header-date'>
                            <Header />  
                            <Date />
                        </div>
                        <UserDisplay /> 
                        <Nav /> 
                        <h2>{singleArticle.title}</h2>
                        <p className='single-article-body'>{singleArticle.body}</p>
                    </div> 
                )
            } else {
                return (
                    <div id ='single-article'>
                        <div className='header-date'>
                            <Header />  
                            <Date />
                        </div>
                        <UserDisplay /> 
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
                            <Link className='link' key ={singleArticle.topic} to={`/topics/${singleArticle.topic}`}>
                                <p>{capitaliseFirstLetter(singleArticle.topic)}</p>
                            </Link> 
                            <button id='show-comments'className='link' onClick={changeCommentVisibility}>
                                <p>{singleArticle.comment_count} comments</p>
                            </button>
                            <PostCommentLink singleArticle={singleArticle}/>
                        </div>
                        <SortComments />
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