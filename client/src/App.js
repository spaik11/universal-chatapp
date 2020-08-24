import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./components/redux/Redux-store/store";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </Provider>
  );
}
