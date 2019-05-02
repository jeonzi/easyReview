import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePageContainer from "./HomePageContainer";
import PostReviewContainer from "./PostReviewContainer";
import MainNavigation from "./component/Navigation/MainNavigation";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 4rem 2.5rem;
  padding: 0;
  font-family: sans-serif;
}`;

const App = props => {
  return (
    <React.Fragment>
      <MainNavigation />
      <Switch>
        <Route exact path="/main" component={HomePageContainer} />
        <Route path="/post_review" component={PostReviewContainer} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
