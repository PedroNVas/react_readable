import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import PostDetails from "./components/PostDetails/PostDetails";
import AllPosts from "./components/Posts/AllPosts";
import CategoryPosts from "./components/Posts/CategoryPosts";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div>
        <Categories />

        <Switch>
          <Route exact path="/" component={AllPosts} />
          <Route exact path="/:category" component={CategoryPosts} />
          <Route exact path="/:category/:postId" component={PostDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
