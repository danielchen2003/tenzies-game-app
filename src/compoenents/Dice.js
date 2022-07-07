import React from "react"

export default function dice({ value, isHeld, holdDice }) {
  // const styles = {
  //   backgroundColor: props.isHeld ? "#59E391" : "white",
  // }
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  }
  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <h2 className="dice-num"> {value}</h2>
    </div>
  )
}
