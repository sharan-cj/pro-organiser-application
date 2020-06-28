import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Boards.module.css";
import AddColumn from "../AddColumn/AddColumn";
import {Redirect} from 'react-router-dom';

export default function Boards(props) {
  const boardID = props.match.params.board;
  const url = `https://pro-org.firebaseio.com/${boardID}.json`;

  const [boardData, setBoardData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const columnRef = React.useRef();

  useEffect(() => {
    getData();
  });

  async function getData() {
    await axios.get(url).then((response) => setBoardData(response.data));
  }

  const addColumn = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const deleteBoardHandler =(event) => {
    event.preventDefault();
    deleteBoard();
  };

  const deleteColumnHandler = (event) => {
    event.preventDefault();
    let columnID = event.currentTarget.id;
    console.log(event.currentTarget.id,'columnID');
    deleteColumn(columnID);
  };

  async function deleteColumn(columnID) {
    axios
      .delete(
        `https://pro-org.firebaseio.com/${boardID}/columns/${columnID}/.json`
      )
      .then((response) => {
        console.log(response);
      });
  }

  async function deleteBoard() {
       axios.delete(url)
       .then (setRedirect(true))
  }

  return (
    <>
      <div className={styles.boardName}>
        <h1>{boardData.boardName} Board</h1>
        <button onClick={deleteBoardHandler}><i className="fa fa-trash fa-3x" aria-hidden="true"></i></button>
      </div>
      <div className={styles.columnContainer}>
        {typeof boardData.columns === "undefined" ? (
          <div className={styles.warning}>No colums found.</div>
        ) : (
          Object.keys(boardData.columns).map((column) => {
            return (
              <div className={styles.column} key={column} >
                <div className={styles.columnName}>
                  <h3>{boardData.columns[column].columnName}</h3>
                  <button
                    className={styles.trash}
                    id={column}
                    ref={columnRef}
                    onClick={deleteColumnHandler}
                  >
                    <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
                  </button>
                </div>
                <hr className={styles.hr} />
                <div className={styles.cardsContainer}>
                    <div className={styles.addCard}> 
                    <button id='CreateCard'>Add a card</button>
                    </div>
                </div>
              </div>
            );
          })
        )}

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

      {redirect ? <Redirect to='/' exact /> :null}
    </>
  );
}
