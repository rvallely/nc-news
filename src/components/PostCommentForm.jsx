import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const PostCommentForm = () => {
    const user = useContext(UserContext);
    const { article_id } = useParams();
    console.log(article_id, user.loggedInUser);
    return <div className='post-comment-form'>
               <h2>Post your comment below:</h2>
               <form>
                   <label>Logged in as: {user.loggedInUser.username}</label>
                   <label>Comment body:</label>
                   <textarea
                       required>
                    </textarea>
                    <br></br>
                    <button>Post</button>
               </form>
    </div>
}

export default PostCommentForm;
