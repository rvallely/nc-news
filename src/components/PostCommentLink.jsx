import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';

import PostCommentForm from './PostCommentForm';

const PostCommentLink = ({ singleArticle }) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
    if (loggedInUser.username === 'guest') {
        return <p onClick={() => alert('Please go to User area and log in to post a comment. :)')}>Post a comment</p>
    } else {
        return <Link key={`${singleArticle.article_id}-post-comment`} className='link' to={`/articles/${singleArticle.article_id}/post_comment`}><p>Post a comment</p></Link>
    }
}

export default PostCommentLink;