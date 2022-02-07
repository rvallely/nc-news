import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import Articles from './components/Articles';
import TopicArticles from './components/TopicArticles';
import SingleArticle from './components/SingleArticle';
import User from './components/User';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
          <Route path='/topics/:topic_slug' element={<Articles />}></Route>
          <Route path='/articles/:article_id' element={<SingleArticle />}></Route>
          <Route path='/user' element={<User />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
