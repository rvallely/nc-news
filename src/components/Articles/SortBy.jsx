import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const SortBy = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTopic = searchParams.get('topic')
    const [input, setInput] = useState('');
    
    let navigate = useNavigate();
    const location = useLocation()

    let topic = undefined;
    if (searchTopic) {
        topic = searchTopic;
    }

    if (location.pathname !== '/articles') {
        return (
            <div>            
                <form className='dropdown'>
                    <select 
                      className='sort-by' 
                      value={input}
                      onChange={(e) => { 
                        setInput(e.target.value);
                            const formatQ = e.target.value.split(' ').join('&');
                            if (topic === undefined) {
                                navigate(`${location.pathname}?${formatQ}`);   
                            } else {
                                navigate(`${location.pathname}?topic=${topic}&${formatQ}`);   
                            }
                        }}> 
                        <option disabled>Sort by: Most Recent</option>
                        <option value='sort_by=created_at order=DESC'>Most Recent</option>
                        <option value='sort_by=comment_count order=DESC'>Most Comments</option>
                        <option value='sort_by=votes order=DESC'>Most Votes</option>
                        <option value='sort_by=created_at order=ASC'>Least Recent</option>
                    </select>
                </form>
            </div>
        )
    } else {
        return (
            <div >            
                <form className='dropdown'  >
                    <select 
                      className='sort-by' 
                      value={input}
                      onChange={(e) => { 
                        setInput(e.target.value);
                            const formatQ = e.target.value.split(' ').join('&');
                            if (topic === undefined) {
                                navigate(`${location.pathname}?${formatQ}`);   
                            } else {
                                navigate(`${location.pathname}?topic=${topic}&${formatQ}`);   
                            }
                        }}> 
                        <option value='' disabled>Sort by: Most Recent</option>
                        <option value='sort_by=created_at order=DESC'>Most Recent</option>
                        <option value='sort_by=comment_count order=DESC'>Most Comments</option>
                        <option value='sort_by=votes order=DESC'>Most Votes</option>
                        <option value='sort_by=author order=ASC'>Author A-Z</option>
                        <option value='sort_by=author order=DESC'>Author Z-A</option>
                        <option value='sort_by=created_at order=ASC'>Least Recent</option>
                    </select>
                </form>
            </div>
        )
    }

    
}

export default SortBy;