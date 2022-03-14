import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { postComment } from '../utils/api';
import Nav from './Nav';

const PostCommentForm = () => {
    

    const user = useContext(UserContext);
    const username = user.username;
    const { article_id } = useParams();
    const [ body, setBody ] = useState('');
    const [ isPending, setIsPending ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = { username, body };

        setIsPending(true);

        postComment(article_id, comment).then((postedCommentFromAPI) => {
            setIsPending(false);
            navigate(`/articles/${article_id}`);
        });
    }
    // console.log(article_id, user.loggedInUser);
    return <div className='post-comment-form'>
               <Nav />
               <h2>Post your comment below:</h2>
               <form 
                   onSubmit={handleSubmit}>
                   <label>Logged in as: {username}</label>
                   <label>Comment body:</label>
                   <textarea
                       required
                       value={body}
                       onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                    <br></br>
                    { !isPending && <button>Post</button>}
                    { isPending && <button disabled>Posting comment ...</button>}
                 
               </form>
    </div>
}

export default PostCommentForm;
