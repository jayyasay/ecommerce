import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './components/Form'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {data.map(item => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
