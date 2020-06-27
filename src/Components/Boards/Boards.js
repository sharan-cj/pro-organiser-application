import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Boards.module.css";
import AddColumn from "../AddColumn/AddColumn";

export default function Boards({ match }) {
  const boardID = match.params.board;
  const url = `https://pro-org.firebaseio.com/${boardID}.json`;

  const [boardData, setBoardData] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios.get(url).then((response) => setBoardData(response.data));
  }

  const addColumn = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.boardName}>
        <h1>{boardData.boardName} Board</h1>
      </div>
      <div className={styles.columnContainer}>
        {boardData === ""
          ? null
          : Object.keys(boardData.columns).map((column) => {
              return (
                <div className={styles.column} key={column}>{boardData.columns[column].columnName}</div>
              );
            })}

        <button className={styles.addColumn} onClick={addColumn}>
          <div className={styles.columnAdd}>Add a column</div>
        </button>
      </div>
      {showModal ? (
        <AddColumn
          exit={() => {
            setShowModal(false);
          }}
          boardID={boardID}
        />
      ) : null}
    </>
  );
}
