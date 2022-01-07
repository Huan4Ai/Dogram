import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import ShowAllPosts from './components/Posts/ShowAllPosts';
import UserProfilePage from './components/Posts/UserProfile';
import SinglePost from './components/Posts/SinglePost';
import SingleUserProfile from './components/UserProfile/profilePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const session = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div>
          {session && <Navigation isLoaded={isLoaded} />}
          <Switch>
            <Route path="/" exact>
              {session ? <ShowAllPosts /> : <LoginFormPage />}
            </Route>
            <Route path="/my-profile" exact>
              {session ? <UserProfilePage /> : <LoginFormPage />}
            </Route>
            <Route path="/posts/:postId" exact>
              {session ? <SinglePost /> : <LoginFormPage />}
            </Route>
            <Route path="/users/:userId" exact>
              {session ? <SingleUserProfile /> : <LoginFormPage />}
            </Route>
          </Switch>

        </div>
      )}
    </>
  );
}

export default App;
