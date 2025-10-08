import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {all}</div>
      <div>average {(props.good - props.bad) / all}</div>
      <div>positive {props.good / all * 100} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App