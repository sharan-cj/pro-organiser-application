import React, { useState, useEffect } from "react";
import styles from "./AddCard.module.css";
import axios from "axios";

export default function AddCard(props) {
  const { boardID, columnID } = props;

  const [teamMembers, setTeamMembers] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskTeam, setTaskTeam] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [dateWarning, setDateWarning] = useState(false);
  const [inputWarning, setInputWarning] = useState(false);

  const boardUrl = `https://pro-org.firebaseio.com/${boardID}/teamMembers.json`;
  const cardUrl = `https://pro-org.firebaseio.com/${boardID}/columns/${columnID}/cards.json`;

  useEffect(() => {
    getTeamMembers();
  }, []);

  const createCardHandler = (event) => {
    event.preventDefault();
    if (
      taskTitle === "" ||
      taskDescription === "" ||
      taskTeam === "" ||
      dueDate === ""
    ) {
      setInputWarning(true);
    } else {
      console.log(taskTitle, taskTeam, taskDescription, dueDate);
      postCardDetails();
      props.exit(props);
    }
  };

  const selectHandler = (event) => {
    const taskTeam = [...event.target.selectedOptions].map(
      (mate) => mate.value
    );
    setTaskTeam(taskTeam);
  };

  const inputHandler = (event) => {
    event.preventDefault();
    setInputWarning(false);
    setDateWarning(false);
    const id = event.target.id;
    if (id === "due_date") {
      const inputDate = new Date(event.target.value);
      inputDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (today > inputDate) {
        setDateWarning(true);
      } else {
        setDueDate(inputDate.toISOString().substring(0, 10));
      }
    } else if (id === "title") {
      setTaskTitle(event.target.value);
    } else if (id === "description") {
      setTaskDescription(event.target.value);
    }
  };

  async function getTeamMembers() {
    await axios(boardUrl).then((response) => {
      console.log(response.data);
      setTeamMembers(response.data);
    });
  }

  async function postCardDetails() {
    await axios.post(cardUrl, {
      taskTitle: taskTitle,
      taskTeam: taskTeam,
      taskDescription: taskDescription,
      dueDate: dueDate,
    })
    .then(response => console.log(response))
  }

  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <div className={styles.AddColumnModal}>
        <div className={styles.heading}>
          <h2> Add card</h2>
          <button onClick={props.exit}>
            <i className="fa fa-times fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <div className={styles.input}>
          <label>Enter a title for your task</label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Add a new icon"
            onChange={inputHandler}
          />
        </div>
        <div className={styles.select}>
          <label>
            Choose members for this task (select multiple, if needed)
          </label>
          <select multiple onChange={selectHandler}>
            {teamMembers === ""
              ? null
              : teamMembers.map((mate) => {
                  return (
                    <option value={mate} key={mate}>
                      {mate}
                    </option>
                  );
                })}
          </select>
        </div>
        <div className={styles.input}>
          <label>Add the description for your task</label>
          <input
            type="text"
            id="description"
            placeholder="Add your description here"
            onChange={inputHandler}
          />
        </div>
        <div className={styles.input}>
          <label>Select the due date for this task</label>
          <input type="date" id="due_date" onChange={inputHandler} />
          {dateWarning ? (
            <div className={styles.warning}>Please select a future date.</div>
          ) : null}
          {inputWarning ? (
            <div className={styles.warning}>Please fill all the inputs.</div>
          ) : null}
        </div>
        <div className={styles.addCardBtn}>
          <button id="CreateCard" onClick={createCardHandler}>
            Create Card
          </button>
        </div>
      </div>
    </div>
  );
}
