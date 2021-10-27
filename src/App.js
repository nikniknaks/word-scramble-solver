import React from 'react'
import './App.css'
import '@material/mwc-textfield'
import '@material/mwc-button'
import { loader } from 'graphql.macro'

const query = loader('./queries/find_word_paramd.gql')

let letterOccurrenceObject = {}

const getDataFetch = async word => {
  // console.log("getDataFetch()", process.env.REACT_APP_FAUNA_DB_KEY);
  // console.log(JSON.stringify({
  //   query: query.loc.source.body,
  //   variables: { word: word }
  // }, false, '    '));
  const response =
    await fetch("https://graphql.fauna.com/graphql",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${process.env.REACT_APP_FAUNA_DB_KEY}`,
        },
        body: JSON.stringify({
          query: query.loc.source.body,
          variables: { word: word }
        }),
      }
    )
  console.log(await response.json())
}

const getValue = e => {
  const letterArray = e.target.value.split("")
  const letterObject = letterArray.reduce((accum, value) => {
    if (accum[value] >= 1) {
      accum[value]++
      return accum
    } else {
      return {
        ...accum,
        [value]: 1
      } 
    }
  },{})
  letterOccurrenceObject = Object.keys(letterObject)
    .reduce((accum, value) => {
      return [
        ...accum,
        {letter: value, occurrence: letterObject[value]}
      ]
    },[])
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Word Scramble Solver
        <input
          onChange={getValue}
          label="Enter Anagram"
        >
        </input>
        <mwc-button
          label="Enter Anagram"
          onClick={() => getDataFetch(letterOccurrenceObject)}
          raised
        >
        </mwc-button>
      </header>
      <div>
      </div>
    </div>
  )
}

export default App;
