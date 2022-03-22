import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserContext } from './contexts/User';
import Articles from './components/Articles/Articles';
import ArticlesByUser from './components/Articles/ArticlesByUser';
import Login from './components/General/Login';
import PostArticleForm from './components/Articles/PostArticleForm';
import PostCommentForm from './components/Articles/PostCommentForm';
import Redirect from './components/General/Redirect';
import SingleArticle from './components/Articles/SingleArticle';
import User from './components/User/User';
import UserArticles from './components/User/UserArticles';
import UserComments from './components/User/UserComments';
import UserFeedback from './components/User/UserFeedback';

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
      username: 'Log in',
      name: '',
      avatar_url:
        'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
  });

  return (
    <BrowserRouter>
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
          <Route path='/articles/:article_id' element={<SingleArticle />}></Route>
          <Route path='/user_feedback' element={<UserFeedback />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/user/comments' element={<UserComments />}></Route>
          <Route path='/user/articles' element={<UserArticles />}></Route>
          <Route path='/articles/:article_id/post_comment' element={<PostCommentForm />}></Route>
          <Route path='/articles/user/:username' element={<ArticlesByUser />}></Route>
          <Route path='/user/post_article' element={<PostArticleForm />}></Route>
          <Route path='*' element={<Redirect />}></Route>
        </Routes>
      </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
