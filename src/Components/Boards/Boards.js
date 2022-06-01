import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Boards.module.css";
import AddColumn from "../AddColumn/AddColumn";
import AddCard from "../AddCard/AddCard";
import Cards from "../Cards/Cards";
import { useHistory } from "react-router-dom";
export default function Boards(props) {
  const boardID = props.match.params.board;
  const url = `https://pro-org.firebaseio.com/${boardID}.json`;

  const [boardData, setBoardData] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useHistory();

  const columnRef = React.useRef();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await axios.get(url);
    setBoardData(data);
  }

  const addColumnHandler = (event) => {
    event.preventDefault();
    setShowColumnModal(true);
  };

  const addCardHandler = (event) => {
    event.preventDefault();
    setSelectedColumn(event.currentTarget.parentNode.id);
    setShowCardModal(true);
  };

  const deleteBoardHandler = (event) => {
    event.preventDefault();
    deleteBoard();
  };

  const deleteColumnHandler = (event) => {
    event.preventDefault();
    let columnID = event.currentTarget.id;
    console.log(event.currentTarget.id, "columnID");
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
    await axios.delete(url);
    setRedirect(true);
  }

  return (
    <>
      <div className={styles.boardName}>
        <h1>{boardData.boardName} Board</h1>
        <button onClick={deleteBoardHandler}>
          <i className="fa fa-trash fa-3x" aria-hidden="true"></i>
        </button>
      </div>
      <div className={styles.columnContainer}>
        {typeof boardData.columns === "undefined" ? (
          <div className={styles.warning}>No colums found.</div>
        ) : (
          Object.keys(boardData.columns).map((column) => {
            return (
              <div className={styles.column} key={column}>
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
                  {boardData.columns[column].cards ? (
                    Object.keys(boardData.columns[column].cards).map((card) => {
                      return (
                        <Cards
                          key={card}
                          cardID={card}
                          boardID={boardID}
                          columnID={column}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.notFound}>No cards found.</div>
                  )}

                  <div className={styles.addCard} id={column}>
                    <button id="CreateCard" onClick={addCardHandler}>
                      Add a card
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <button className={styles.addColumn} onClick={addColumnHandler}>
          <div className={styles.columnAdd}>Add a column</div>
        </button>
      </div>

      {showColumnModal ? (
        <AddColumn
          exit={() => {
            setShowColumnModal(false);
          }}
          boardID={boardID}
        />
      ) : null}

      {showCardModal ? (
        <AddCard
          boardID={boardID}
          columnID={selectedColumn}
          exit={() => {
            setShowCardModal(false);
          }}
        />
      ) : null}

      {redirect ? navigate.push("/") : null}
    </>
  );
}
