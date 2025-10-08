import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad) / all
  const pos = props.good / all * 100

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine value={props.good} text="good" />
        <StatisticLine value={props.neutral} text="neutral" />
        <StatisticLine value={props.bad} text="bad" />
        <StatisticLine value={all} text="all" />
        <StatisticLine value={avg} text="average" />
        <StatisticLine value={pos + ' %'} text="positive" />
      </tbody>
    </table>
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
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App