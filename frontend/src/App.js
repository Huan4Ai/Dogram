import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import ShowAllPosts from './components/Posts/ShowAllPosts';
import CreatePost from './components/Posts/AddPost';
import UserProfilePage from './components/Posts/UserProfile';

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
            {session? <ShowAllPosts /> : <LoginFormPage />}
          </Route>
          <Route path="/new-post" exact>
            {session? <CreatePost /> : null }
          </Route>
          <Route path="/my-profile" exact>
              {session ? <UserProfilePage /> : <LoginFormPage /> }
          </Route>
        </Switch>

        </div>
      )}
    </>
  );
}

export default App;
