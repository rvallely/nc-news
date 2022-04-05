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
    let searchSort_by = searchParams.get('sort_by');
    let searchOrder = searchParams.get('order');
    
    if (searchSort_by === null && searchOrder === null) {
        searchSort_by = 'created_at';
        searchOrder = 'DESC';
    }

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
                            <UserDisplay /> 
                        </div>
                        <Nav /> 
                        <h2>{singleArticle.title}</h2>
                        <p className='single-article-body'>{singleArticle.body}</p>
                    </div> 
                )
            } else {
                return (
                    <div>
                        <div className='header-date'>
                            <Header />  
                            <Date />
                            <UserDisplay /> 
                        </div>
                        <Nav /> 
                        <div className='single-article'>
                            <h2 className='single-article-title'>{singleArticle.title}</h2>
                            <Link className='link' to={`/articles/user/${singleArticle.author}`}>
                                    <h4 className='single-article-author'>{singleArticle.author}</h4>
                            </Link>
                            <div className='single-article-created_at'>
                                    <p className='single-article-created_at-e'>{formatCreatedAt(singleArticle.created_at)[0]}</p>
                                    <p className='single-article-created_at-e'>{formatCreatedAt(singleArticle.created_at)[1]}</p>
                            </div>
                            <p className='single-article-body'>{singleArticle.body}</p>
                            <div className='single-article-details'>
                                <ArticleVotes article_id={singleArticle.article_id} votes={singleArticle.votes}/>
                                <PostCommentLink singleArticle={singleArticle}/>
                            </div>
                            <div className='single-article-details-2'>
                                <h2 id='show-comments' onClick={changeCommentVisibility}className='single-article-comments-link' >{singleArticle.comment_count} comments</h2>
                                <Link className='link' key={singleArticle.topic} to={`/articles?topic=${singleArticle.topic}`}>
                                    <p className='single-article-topic'>More {singleArticle.topic} here</p>
                                </Link>  
                            </div>
                        <div id='comments' className='single-article-comments-container' style={{visibility:'visible'}}>
                        <SortComments />
                            {comments.map((comment) => {
                                return (
                                    <div className='single-article-comment' key={comment.comment_id}>
                                    <Link className='link' to={`/articles/user/${comment.author}`}>
                                        <h4 className='single-article-comment-author'>{comment.author}</h4>
                                    </Link>
                                    <div className='single-article-comment-created_at'>
                                            <p className='single-article-comment-created_at-e'>{formatCreatedAt(comment.created_at)[0]}</p>
                                            <p className='single-article-comment-created_at-e'>{formatCreatedAt(comment.created_at)[1]}</p>
                                    </div>
                                        <p className='single-article-comment-body'>{comment.body}</p>
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