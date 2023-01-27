import './App.css';
import TestForm from './components/Form'
function App() {

  // const [data, setData] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/products')
  //   .then(response => {
  //     setData(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }, [])
  return (
    <div className="App">
      <TestForm />
    </div>
  );
}

export default App;
