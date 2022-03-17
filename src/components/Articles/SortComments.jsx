import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const SortComments = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    const [input, setInput] = useState('');
    
    let navigate = useNavigate();
    const location = useLocation()
    console.log('location is ', location)

    let topic = undefined;
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
                            const formatQ = e.target.value.split(' ').join('&');
                            if (topic === undefined) {
                                navigate(`${location.pathname}#comments?${formatQ}`);   
                            } else {
                                navigate(`${location.pathname}#comments?topic=${topic}&${formatQ}`);   
                            }
                         }}> 
                        <option disabled>Sort by: Most Recent</option>
                        <option value='sort_by=created_at order=DESC'>Most Recent</option>
                        <option value='sort_by=votes order=DESC'>Most Votes</option>
                        <option value='sort_by=created_at order=ASC'>Least Recent</option>
                    </select>
                </form>
            </div>
        )  
}

export default SortComments;