import "./App.css"
import { useState, useEffect } from "react"
import Dice from "./compoenents/Dice"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  // const [isHeld,Set]
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every((x) => x.isHeld)
    const first = dice[0].value
    if (allHeld && dice.every((x) => x.value === first)) {
      setTenzies(true)
      console.log("you won")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  const diceElements = dice.map((d) => (
    <Dice
      value={d.value}
      key={d.id}
      isHeld={d.isHeld}
      holdDice={() => holdDice(d.id)} //放在里面都在初始化的时候全部叫了一遍
    />
  ))
  //另外一种写法但是这种要传参数id到dice.js
  //   const diceElements = dice.map(die => (
  //     <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={holdDice} />
  // ))

  function rollDice() {
    if (!tenzies)
      setDice((oldDice) =>
        oldDice.map((dice) => (dice.isHeld ? dice : generateNewDie()))
      )
    else {
      setDice(allNewDice())
      setTenzies(false)
    }
    // for (let i = 0; i < 10; i++) {
    //   if (!dice[i].isHeld) {
    //     return { ...dice[i], value: Math.ceil(Math.random() * 6) }
    //   } else return { ...dice[i] }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((x) => (x.id === id ? { ...x, isHeld: !x.isHeld } : x))
    )
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "NewGame" : "Roll"}
      </button>
    </main>
  )
}

export default App
