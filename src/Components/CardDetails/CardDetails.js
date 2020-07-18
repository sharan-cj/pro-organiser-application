import React from "react";
import styles from "./CardDetails.module.css";

export default function CardDetails(props) {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <div className={styles.cardDetailsModal}>
        <div className={styles.taskTitle}>
          <h2>{props.cardData.taskTitle}</h2>
          <button onClick={props.exit}>
            <i className="fa fa-times fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <div className={styles.description}>
          <h3>Description</h3>
          <span>{props.cardData.taskDescription}</span>
        </div>
        <div className={styles.team}>
          <h3>Members</h3>
          <div className={styles.members}>
          {props.cardData.taskTeam.map(member => {
              return (
                <div key={member}>{member}</div>
              )
          })}
          </div>
          
        </div>
        <div className={styles.dueDate}>
          <h3>Due Date</h3>
          <span>{props.cardData.dueDate}</span>
        </div>
      </div>
    </div>
  );
}
