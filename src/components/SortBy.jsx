import React from 'react';
import { useState } from 'react';

const SortBy = (props) => {
    const [selection, setSelection] = useState('')
    const handleChange = (event) => {
        setSelection(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setSortBy(selection);
        setSelection('');
    }

    return (
        <div >
        <form className='dropdown' onSubmit={handleSubmit} >
                <select id='sort-by' onChange={handleChange} >   // do something
                    <option id='drop-down-placeholder' value='' disabled selected>Sort by: Most Recent</option>
                    <option value='sort_by=author order=ASC'>Author: a-z</option>
                    <option value='sort_by=author order=DESC'>Author:z-a</option>
                    <option value='sort_by=comment_count order=ASC'>Comments: least to most</option>
                    <option value='sort_by=comment_count order=DESC'>Comments: most to least</option>
                    <option value='sort_by=created_at order=DESC'>Date: most to least recent</option>
                    <option value='sort_by=created_at order=ASC'>Date: least to most recent</option>
                    <option value='sort_by=votes order=ASC'>Votes: least to most</option>
                    <option value='sort_by=votes order=DESC'>Votes: most to least</option>
                </select>
                <button type='submit'><p>&#128640;</p></button> 
            </form>
        </div>
    )
}

export default SortBy;