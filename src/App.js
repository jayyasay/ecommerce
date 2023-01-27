import './App.css';
import TestForm from './components/Form'
import FormProducts from './components/FormProducts';
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
      <FormProducts />
    </div>
  );
}

export default App;
