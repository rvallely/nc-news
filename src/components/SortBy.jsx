import React from 'react';
import { useState, useEffect } from 'react';

const SortBy = (props) => {
    const [selection, setSelection] = useState('')

    return (
        <div >
        <form className='dropdown'  >
                <select 
               
                    id='sort-by' 
                    value={selection}
                    onChange={(e) => { 
                        setSelection(e.target.value);
                        e.preventDefault();
                        props.setSortBy(e.target.value);
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