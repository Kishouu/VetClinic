import logo from './logo.svg';
import './App.css';

function App() {
  const[items,setItems] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/items")
		.then((responce) => responce.json())
		.then((data) => setItems(data));
	},[]);
	return(
		<div className = "App">
		<header className="App-header">
		<h1>Items</h1>
		<ul>
		{items.map((item) => (
			<li key={item.id}>{item.name}</li>
		))}
		</ul>
      </header>
    </div>
  );
}

export default App;
