import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Date from '../General/Date';
import Header from '../General/Header';
import Nav from '../General/Nav';
import UserDisplay from '../General/UserDisplay';
import { postComment } from '../../utils/api';

const PostCommentForm = () => {
    const user = useContext(UserContext);
    const username = user.loggedInUser.username;
    const { article_id } = useParams();
    const [ body, setBody ] = useState('');
    const [ isPending, setIsPending ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = { username, body };
        setIsPending(true);
        postComment(article_id, comment).then(() => {
            setIsPending(false);
            navigate(`/articles/${article_id}`);
        });
    }

    return (
        <div className='form'>
            <div className='header-date'>
                    <Header />  
                    <Date />
                </div>
            <UserDisplay />
            <Nav />
            <h2>Post your comment below:</h2>
            <form onSubmit={handleSubmit}>
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
    )
}

export default PostCommentForm;
