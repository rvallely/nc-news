import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { patchArticle } from '../../utils/api';

const ArticleVotes = ({ article_id, votes }) => {
    const [voteChange, setVoteChange] = useState(0);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const addVote = () => {
        setVoteChange((currChange) => currChange + 1);
        patchArticle(article_id).catch((err) => {
            setVoteChange((currChange) => currChange - 1);
        });
        document.getElementById('upvote-button').disabled = true;
    }

    if (loggedInUser.username === 'guest') {
        return <button className='single-article-votes' onClick={() => alert('Please go to User area and log in to vote :)')}>{votes}&#128077;</button>
    } else {
        return <button className='single-article-votes' id='upvote-button' onClick={() => addVote()}>{votes + voteChange}&#128077;</button>
    }
}

export default ArticleVotes;