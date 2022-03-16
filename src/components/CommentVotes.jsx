import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { patchComment } from '../utils/api';

const CommentVotes = ({ comment_id, votes }) => {
    const [voteChange, setVoteChange] = useState(0);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    const addVote = () => {
        setVoteChange((currChange) => currChange + 1);
        patchComment(comment_id).catch((err) => {
            setVoteChange((currChange) => currChange - 1)
        });
    }
    if (loggedInUser.username === 'guest') {
        return <button onClick={() => alert('Please go to User area and log in to vote! :)')}>{votes}&#128077;</button>
    } else {
        return <button onClick={() => addVote()}>{votes + voteChange}&#128077;</button>
    }
}

export default CommentVotes;