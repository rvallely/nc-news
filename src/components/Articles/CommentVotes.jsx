import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/User';
import { patchComment } from '../../utils/api';

const CommentVotes = ({ comment_id, votes }) => {
    const [voteChange, setVoteChange] = useState(0);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    const addVote = () => {
        setVoteChange((currChange) => currChange + 1);
        patchComment(comment_id).catch((err) => {
            setVoteChange((currChange) => currChange - 1)
        });
        document.getElementById(`comment-${comment_id}-upvote-button`).disabled = true;
    }
    
    if (loggedInUser.username === 'Log in') {
        return <button id={`comment-${comment_id}-upvote-button`} className='single-article-comment-votes' onClick={() => alert('Please go to User area and log in to vote! :)')}>{votes}&#128077;</button>
    } else {
        return <button id={`comment-${comment_id}-upvote-button`} className='single-article-comment-votes' onClick={() => addVote()}>{votes + voteChange}&#128077;</button>
    }
}

export default CommentVotes;