import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return(
  <button onClick={onClick}>{text}</button>
  )
}

const Statisticline = ({ text, value }) => {
  if (text === 'positive') {
    value = value.toString() + ' %'
  }

  return(
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = (props) => {
//  console.log(props.rows)
  if (props.rows[0].value + props.rows[1].value + props.rows[2].value === 0) {
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody><tr><td>No feedback given</td></tr></tbody>
        </table>
      </div>
    )
  }
  
  var rowsEdited = [];
  for (var i = 0; i < props.rows.length; i++) {
    rowsEdited = rowsEdited.concat(<Statisticline key={i} text={props.rows[i].text} value={props.rows[i].value} />)
  }
  // console.log(rowsEdited)
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          {rowsEdited}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  
  const increaseGood = () => {
    setGood(good+1)
    setAvg(avg+1)
  }
  
  const increaseBad = () => {
    setBad(bad+1)
    setAvg(avg-1)
  }

  const rows = [
    { text: 'good', value: good },
    { text: 'neutral', value: neutral },
    { text: 'bad', value: bad },
    { text: 'all', value: (good + neutral + bad) },
    { text: 'average', value: avg/(good + neutral + bad) },
    { text: 'positive', value: good/(good + neutral + bad)*100}
  ];
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text='good' />
      <Button onClick={() => setNeutral(neutral +1)} text='neutral' />
      <Button onClick={increaseBad} text='bad' />

      <Statistics rows={rows}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)