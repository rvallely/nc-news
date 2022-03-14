import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const SortBy = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    const [input, setInput] = useState('');
    
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
                    value={input}
                    onChange={(e) => { 
                       setInput(e.target.value);
                    //    console.log(e.target.value);
                        // e.preventDefault();
                        const formatQ = e.target.value.split(' ').join('&');

                        if (topic === undefined) {
                            navigate(`${location.pathname}?${formatQ}`)   
                        } else {
                            navigate(`${location.pathname}?topic=${topic}&${formatQ}`)   
                        }
                        //console.log('The input is ', input)
                        props.setSortBy(e.target.value);
                        // setInput('');
                        // console.log('The input is ', input)
                    }}> 
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