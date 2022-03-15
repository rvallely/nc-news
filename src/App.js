import './App.css';
import Header from './components/Header';
import Date from './components/Date';
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle';
import User from './components/User';
import Redirect from '../src/components/Redirect';
import Comments from './components/Comments';
import { UserContext } from './contexts/User';
import UserDisplay from './components/UserDisplay';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import PostCommentForm from './components/PostCommentForm';
import UserComments from './components/UserComments';
import UserArticles from './components/UserArticles';


function App() {
  // console.log(UserContext)
  const [loggedInUser, setLoggedInUser] = useState({
      username: 'jessjelly',
      name: 'Jess Jelly',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141'
    
  });

  return (
    <BrowserRouter>
    <UserContext.Provider value={loggedInUser}>
      <div className="App">
        <div className='header-date'>
              <Header />  
              <Date />
         </div>
        <UserDisplay />
        <Routes>
          <Route path='/articles' element={<Articles />}></Route>
          

          <Route path='/articles/:article_id' element={<SingleArticle />}></Route>
          <Route path='/articles/:article_id/comments' element={<Comments />}></Route>

          {/* <Route path='/topics/:topic_slug' element={<Articles />}></Route>
          */}
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
