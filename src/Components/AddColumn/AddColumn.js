import React, { useState, useEffect } from "react";
import styles from "./AddColumn.module.css";
import axios from "axios";

export default function AddColumn(props) {
  const [columnName, setColumnName] = useState("");
  const [ warning, setWarning] = useState(false);

  const addColumnInputRef = React.useRef();
  const url = `https://pro-org.firebaseio.com/${props.boardID}/columns.json`;

  const columnSubmitHandler = (event) => {
    event.preventDefault();
    if(columnName === '') {
        setWarning(true);
    }
    else {
        setWarning(false);
        postData();
        props.exit(props);
    }
    
  };

  const columnNameHandler =(event) => {
    setColumnName(event.target.value);
    setWarning(false);
  }

  useEffect(() => {
    addColumnInputRef.current.focus();
    console.log(props)
  }, []);

  async function postData() {
    await axios.post(url, {
        columnName: columnName,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <div className={styles.AddColumnModal}>
        <div className={styles.header}>
          <h2>Add Column</h2>
          <button className={styles.closeBtn} onClick={props.exit}>
            <i className="fa fa-window-close fa-2x"></i>
          </button>
        </div>
        {warning ? <div className={styles.warning}>
            Column name cannot be empty.
        </div> : null }
        
        <div className={styles.input}>
          <label>Enter a column name: </label>
          <input type="text" id="column_name" ref={addColumnInputRef} onChange={columnNameHandler} required/>
        </div>
        <div className={styles.createColumnBtn}>
          <button id="CreateColumn" onClick={columnSubmitHandler}>
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
