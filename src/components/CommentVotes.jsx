import { patchComment } from '../utils/api';
import { useState } from 'react';

const CommentVotes = ({comment_id, votes}) => {
    const [voteChange, setVoteChange] = useState(0);
    const addVote = () => {
        setVoteChange((currChange) => currChange + 1);
        patchComment(comment_id).catch((err) => {
            setVoteChange((currChange) => currChange - 1)
        });
    }
    return <button onClick={() => addVote()}>{votes + voteChange}&#128077;</button>
}

export default CommentVotes;