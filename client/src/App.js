import './App.css';
import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostPage from './pages/PostPage'; // Import the PostPage component
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const posts = [
    {
      id: '1',
      title: 'Cartwheel in Chelsea 🤸🏽‍♀️',
      author: 'Harvey Milian',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      created_at: '2024-04-27T12:30:45Z',
    },
    {
      id: '2',
      title: 'Love Lock in Paris 🔒',
      author: 'Beauford Delaney',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      created_at: '2024-04-26T09:15:30Z',
    },
    {
      id: '3',
      title: 'Wear Pink on Fridays 🎀',
      author: 'Onika Tonya',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      created_at: '2024-04-25T15:45:20Z',
    },
    {
      id: '4',
      title: 'Adopt a Dog 🐶',
      author: 'Denise Michelle',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      created_at: '2024-04-24T18:20:10Z',
    },
  ];

  let element = useRoutes([
    {
      path: '/',
      element: <ReadPosts data={posts} className="ReadPosts" />,
    },
    {
      path: '/edit/:id',
      element: <EditPost data={posts} />,
    },
    {
      path: '/new',
      element: <CreatePost />,
    },
    {
      path: '/post/:id',
      element: <PostPage />, // Remove the data prop here
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <Link to="/" className="titleLink">
          <h1 className="title">Pug Post</h1>
        </Link>
        <Link to="/">
          <button className="headerBtn">Explore Page</button>
        </Link>
        <Link to="/new">
          <button className="headerBtn">Create Post</button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
