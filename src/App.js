import './App.css';
import { useState } from 'react';
import { UserContext } from './contexts/User';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Articles from './components/Articles';
import Comments from './components/Comments';
import Date from './components/Date';
import Header from './components/Header';
import Login from './components/Login';
import PostCommentForm from './components/PostCommentForm';
import Redirect from '../src/components/Redirect';
import SingleArticle from './components/SingleArticle';
import User from './components/User';
import UserDisplay from './components/UserDisplay';
import UserComments from './components/UserComments';
import UserArticles from './components/UserArticles';
import UserFeedback from './components/UserFeedback';


function App() {
  // console.log(UserContext)
  const [loggedInUser, setLoggedInUser] = useState({
      username: 'guest',
      name: '',
      avatar_url:
        'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
    
  });

  return (
    <BrowserRouter>
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <div className='App'>
        {/* <div className='header-date'>
              <Header />  
              <Date />
         </div>
        <UserDisplay /> */}
        {/* need to put in header date everywhere or find work around with guest user values */}
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
          

          <Route path='/articles/:article_id' element={<SingleArticle />}></Route>
          <Route path='/articles/:article_id/comments' element={<Comments />}></Route>

          {/* <Route path='/topics/:topic_slug' element={<Articles />}></Route>
          */}
          <Route path='/user_feedback' element={<UserFeedback />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/user/comments' element={<UserComments />}></Route>
          <Route path='/user/articles' element={<UserArticles />}></Route>
          <Route path='/articles/:article_id/post_comment' element={<PostCommentForm />}></Route>
          <Route path='*' element={<Redirect />}></Route>
        </Routes>
      </div>
      </UserContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
