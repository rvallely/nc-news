import { patchArticle } from '../utils/api';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const ArticleVotes = ({article_id, votes}) => {
    const [voteChange, setVoteChange] = useState(0);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    const addVote = () => {
        setVoteChange((currChange) => currChange + 1);
        patchArticle(article_id).catch((err) => {
            setVoteChange((currChange) => currChange - 1)
        });
    }
    // const subtractVote = () => {
    //     setVoteChange((currChange) => currChange - 1);
    //     patchArticle(article_id, 'down').catch((err) => {
    //         setVoteChange((currChange) => currChange + 1)
    //     });
    // }
    if (loggedInUser.username === 'guest') {
        return <button onClick={() => alert('Please go to User area and log in to vote! :)')}>{votes}&#128077;</button>
    } else {
        return <button onClick={() => addVote()}>{votes + voteChange}&#128077;</button>
    }
   
            {/* <button onClick={() => subtractVote()}>{votes - voteChange}&#128078;</button> */}

}

export default ArticleVotes;