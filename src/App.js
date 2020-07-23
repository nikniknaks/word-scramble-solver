import React from 'react';
import './App.css';
import '@material/mwc-textfield';
import '@material/mwc-button';
import { loader } from 'graphql.macro';

const query = loader('./queries/find_word_paramd.gql');


const getDataFetch = async () => {
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Word Scramble Solver
        <mwc-textfield label="Enter Anagram" raised></mwc-textfield>
        <mwc-button label="Enter Anagram" onClick={getDataFetch} raised></mwc-button>
      </header>
      <div>
      </div>
    </div>
  );
}

export default App;
