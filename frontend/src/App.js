// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import CreateASpotForm from "./components/CreateASpotForm";
import SpotDetail from "./components/SpotDetail";
import EditASpotForm from "./components/EditASpotForm";

import * as sessionActions from "./store/session";

import { thunkGetAllSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch added here to getAllSpots upon first render
    dispatch(thunkGetAllSpots());
  }, [dispatch]);

  // const spots = useSelector(state => state.spots.allSpots)

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
          <Route path="/spots/:spotId" >
            <SpotDetail component={SpotDetail} />
            <EditASpotForm component={EditASpotForm} />
            {/* spots={spots} */}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
