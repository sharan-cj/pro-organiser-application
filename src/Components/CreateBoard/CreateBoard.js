import React, { useState, useEffect } from "react";
import styles from "./CreateBoard.module.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function CreateBoard() {
  const dataBaseUrl = "https://pro-org.firebaseio.com/.json";

  const [boardName, setBoardName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [boardType, setBoardType] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [warning, setWarning] = useState(false);

  async function postData() {
    await axios
      .post(dataBaseUrl, {
        boardName,
        teamMembers,
        boardType,
        columns: "",
      })
      .then((response) => {
        console.log(response);
      });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (boardName === "" || teamMembers === "" || boardType === "") {
      setWarning(true);
    } else {
      postData();
      formClear();
      setRedirect(true);
      setWarning(false);
    }
  };

  const inputHandler = (event) => {
    setWarning(false);
    if (event.target.id === "name") {
      setBoardName(event.target.value);
    } else if (event.target.id === "team") {
      setTeamMembers(event.target.value);
    } else if (event.target.id === "type") {
      setBoardType(event.target.value);
    }
  };

  function formClear() {
    setBoardName("");
    setTeamMembers("");
    setBoardType("");
    document.getElementById("createBoard").reset();
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Create a Board</h1>
      </div>
      <div className={styles.form}>
        <form id="createBoard">
          <div className={styles.board}>
            <label>Enter a name for your board</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Agile Sprint Board"
              onChange={inputHandler}
            />
          </div>
          <div className={styles.teamMembers}>
            <label>Add your team members</label>
            <input
              id="team"
              type="text"
              placeholder="Add your team (separated by commas)"
              onChange={inputHandler}
            />
          </div>
          <div className={styles.boardType}>
            <label>Enter the type of your board</label>
            <input
              id="type"
              type="text"
              placeholder="e.g. Design UX"
              onChange={inputHandler}
            />
          </div>
          {warning ? (
            <div className={styles.warning}>Please fill all the inputs.</div>
          ) : null}
          <div className={styles.createBtn}>
            <button id="CreateBoard" onClick={submitHandler}>
              Create
            </button>
          </div>
        </form>
      </div>
      {redirect ? <Redirect to="/" exact /> : null}
    </div>
  );
}
