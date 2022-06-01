import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [noBoards, setNoBoards] = useState("");
  const dataBaseUrl = "https://pro-org.firebaseio.com/.json";

  useEffect(() => {
    getData();
  }, [noBoards]);

  async function getData() {
    const { data } = await axios.get(dataBaseUrl);
    if (!data) {
      setNoBoards("No Data");
      return;
    }
    setBoards(data);
    setNoBoards("has");
  }

  const refresh = (event) => {
    event.preventDefault();
    getData();
  };

  const warning = (
    <div className={styles.warning}>
      <h4>
        You haven't created any boards. Kindly click on the 'Create Board'
        button in the navigation bar to create a board.
      </h4>
    </div>
  );

  const displayBoards = (
    <div>
      <div className={styles.boardHeading}>
        <h2>Boards</h2>
        <div className={styles.refreshBtn}>
          <button id="refresh" onClick={refresh}>
            <i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className={styles.boardsContainer}>
        {Object.keys(boards).map((board) => {
          return (
            <Link to={`/boards/${board}`} key={board}>
              <div className={styles.boardCard}>
                <h2>{boards[board].boardName}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return <div>{noBoards === "No Data" ? warning : displayBoards}</div>;
}
