import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const PostCommentForm = () => {
    const user = useContext(UserContext);
    const { article_id } = useParams();
    console.log(article_id, user.loggedInUser);
    return <div>
            // username
            // date and time posted
            // add one to comment_count
            // add votes property to the comment
            // comment_body
               <form>
                   <p>Logged in as: {user.loggedInUser.username}</p>
                   <label>Write your comment below:</label>
                   <input
                       type='text'
                       required>
                    </input>
               </form>
    </div>
}

export default PostCommentForm;
