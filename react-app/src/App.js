import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import StorePageMain from "./components/storePageMain/storePageMain";
import GameStorePage from "./components/gameStorePage/gameStorePage";
import LandingPage from "./components/landingPage/landingPage";
import WishlistPage from "./components/wishlistPage/wishlistPage";
import Footer from "./components/footer/footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/wishlist'>
            <WishlistPage/>
          </Route>
          <Route path='/store/:gameId'>
            <GameStorePage />
          </Route>
          <Route exact path='/store'>
            <StorePageMain />
          </Route>
          <Route exact path='/'>
            <StorePageMain />
            {/* <LandingPage/> */}
          </Route>
        </Switch>
      )}
      <Footer isLoaded={isLoaded}/>
    </>
  );
}

export default App;
