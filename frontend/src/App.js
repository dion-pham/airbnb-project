// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupForm from "./components/SignupForm";
import SignUpFormModal from "./components/SignupFormModal";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import CreateASpotForm from "./components/CreateASpotForm";
import SpotDetail from "./components/SpotDetail";
import EditASpotForm from "./components/EditASpotForm";
import CurrentUserBookingsReviews from "./components/CurrentUserBookingsReviews/CurrentUserBookingsReviews";

import * as sessionActions from "./store/session";

import { thunkGetAllSpots } from "./store/spots";
import LoginFormModal from "./components/LoginFormModal";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupForm from "./components/SignupFormModal/SignUpForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(thunkGetAllSpots());
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/sign-up">
            <SignupForm />
          </Route>
          <Route exact path={["/", "/spots"]} >
            <SpotsList component={SpotsList} />
            {/* <CreateASpotForm component={CreateASpotForm} /> */}
          </Route>
          <Route path='/spots/create'>
            <CreateASpotForm component={CreateASpotForm} />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditASpotForm component={EditASpotForm} />
          </Route>
          <Route path="/spots/:spotId" >
            <SpotDetail component={SpotDetail} />
          </Route>
          <Route exact path="/account" >
            <CurrentUserBookingsReviews component={CurrentUserBookingsReviews} />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;
