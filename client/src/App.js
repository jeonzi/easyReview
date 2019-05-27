import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePageContainer from "./Pages/HomePageContainer";
import PostReviewContainer from "./Pages/PostReviewContainer";
import MainNavigation from "./component/Navigation/MainNavigation";
import AuthContainer from "./Pages/AuthContainer";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 4rem 2.5rem 2rem;
  padding: 0;
  font-family: sans-serif;
}
body::-webkit-scrollbar { 
  display: none; 
}
`;

const App = props => {
  return (
    <React.Fragment>
      <MainNavigation />
      <Switch>
        <Route exact path="/main" component={HomePageContainer} />
        <Route path="/post_review" component={PostReviewContainer} />
        <Route path="/auth" component={AuthContainer} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
