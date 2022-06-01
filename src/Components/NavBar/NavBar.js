import React from "react";
import styles from "./NavBar.module.css";
import Home from "../Home/Home";
import CreateBoard from "../CreateBoard/CreateBoard";
import Boards from "../Boards/Boards";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useHistory,
} from "react-router-dom";

export default function NavBar() {
  const history = useHistory();
  return (
    <Router>
      <div className={styles.navBar}>
        <h1
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Pro-Organizer
        </h1>
        <ul>
          <li>
            <NavLink exact activeClassName={styles.highlight} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.highlight} to="/createboard">
              Create board
            </NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createboard" component={CreateBoard} />
        <Route path="/boards/:board" component={Boards} />
      </Switch>
    </Router>
  );
}
