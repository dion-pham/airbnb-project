// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import CreateASpotForm from "./components/CreateASpotForm";
import { thunkGetAllSpots } from "./store/spots";
import SpotDetail from "./components/SpotDetail";

import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch added here to getAllSpots upon first render
    dispatch(thunkGetAllSpots());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" >
            {/* {["/", '/api/spots']} */}
            <SpotsList component={SpotsList} />
            <CreateASpotForm component={CreateASpotForm} />
          </Route>
          {/* path not needed?? */}
          <Route path="/api/spots/:spotId" >
            <SpotDetail component={SpotDetail} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
