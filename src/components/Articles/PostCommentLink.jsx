import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

const PostCommentLink = ({ singleArticle }) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    if (loggedInUser.username === 'guest') {
        return <button className='single-article-post-comment' onClick={() => alert('Please go to User area and log in to post a comment. :)')}>Post a comment</button>
    } else {
        return ( 
            <Link className='single-article-post-comment' key={`${singleArticle.article_id}-post-comment`} to={`/articles/${singleArticle.article_id}/post_comment`}>
                <button className='single-article-post-comment'>Post a comment</button>
            </Link>
        )
    }
}

export default PostCommentLink;