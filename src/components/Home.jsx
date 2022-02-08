import React from 'react';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import Articles from './Articles';

const Home = () => {
    return (
        <>
          <div className='header-date'>
            
            <Header />  
            <Date />
          </div>
          <Articles />
        </>
    )
}

export default Home;