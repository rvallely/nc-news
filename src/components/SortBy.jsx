import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const SortBy = (props) => {
    // const [sortBy, setSortBy] = useState('');
    const [selection, setSelection] = useState('')
 
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')

    let navigate = useNavigate();
    const location = useLocation()

    let topic=undefined;
    if (searchTopic) {
       topic = searchTopic;
    }

    return (
        <div >            
        <form className='dropdown'  >
                <select 
               
                    id='sort-by' 
                    value={selection}
                    onChange={(e) => { 
                        setSelection(e.target.value);
                        e.preventDefault();
                        const formatQ = e.target.value.split(' ').join('&');

                        if (topic === undefined) {
                            navigate(`${location.pathname}?${formatQ}`)   
                        } else {
                            navigate(`${location.pathname}?topic=${topic}&${formatQ}`)   
                        }
                        //props.setSortBy(e.target.value);
                    }} > 
                    <option disabled>Sort by: Most Recent</option>
                    <option value='sort_by=created_at order=DESC'>Most Recent</option>
                    <option value='sort_by=author order=ASC'>Author</option>
                    <option value='sort_by=comment_count order=DESC'>Most Comments</option>
                    <option value='sort_by=votes order=DESC'>Most Votes</option>
                    {/* <option value='sort_by=author order=DESC'>Author Descending</option> */}
                    {/* <option value='sort_by=comment_count order=DESC'>Comments: most to least</option> */} 
                    {/* <option value='sort_by=created_at order=ASC'>Date: least to most recent</option> */}
                    {/* <option value='sort_by=votes order=ASC'>Votes: least to most</option> */}
                </select>
            </form>
        </div>
    )
}

export default SortBy;