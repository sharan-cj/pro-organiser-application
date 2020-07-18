import React, { useState, useEffect } from "react";
import styles from "./Cards.module.css";
import axios from "axios";
import CardDetails from "../CardDetails/CardDetails";

export default function Cards({ cardID, boardID, columnID }) {
  const url = `https://pro-org.firebaseio.com/${boardID}/columns/${columnID}/cards/${cardID}.json`;
  const [cardData, setCardData] = useState(null);
  const [userInitials, setUserInitials] = useState(null);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);


  useEffect(() => {
    getData();
    
  }, []);

function teamInitials (team){
        let userInitial= team.map((name) => {
          const nameArr = name.split("");
          return nameArr[0];
        });
        setUserInitials(userInitial);
}
    

  async function getData() {
    await axios(url).then((response) => {
      setCardData(response.data);
      teamInitials(response.data.taskTeam);
    });

  }

  return (
    <>
    <button className={styles.button} onClick={()=>{setShowCardDetailsModal(true)}}>
    <div className={styles.card}>
        {cardData ? <>
      <div className={styles.cardTitle}>{cardData.taskTitle}</div>
      <div className={styles.userInitialsContainer}>
          <div className={styles.listIcon}><i className="fa fa-list " aria-hidden="true"></i></div>
        {userInitials
          ? userInitials.map((user,index) => {
              return <div className={styles.userInitial} key={index}>{user}</div>
            })
          : null}
      </div> 
      </>: null }
    </div>
    </button>
    {showCardDetailsModal ? <CardDetails columnID={columnID} boardID={boardID} cardID={cardID} cardData={cardData} exit={()=>{setShowCardDetailsModal(false)}} /> : null }
    </>
  );
}
