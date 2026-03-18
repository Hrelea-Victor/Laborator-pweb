import Card from './Card';
import {useState} from 'react';

const projects = [
	{title: "Proiect 1", description: "Pagina cu HTML si CSS"},
	{title: "Proiect 2", description: "Pagina cu JS"},
	{title: "Proiect 3", description: "Dashboard cu React"},
	{title: "Proiect 4", description: "Test1"},
	{title: "Proiect 5", description: "Test2"}
];
function App() {
	const [count, setCount] = useState(0);
return (
	<div>
		<h1>Dashboard</h1>
		<p>Numele vostru </p>
		<h2>H2 de test</h2>
		{projects.map(function(item, index) {
			return <Card key = {index} title = {item.title} description = {item.description}/>;
		})}
		<p>Ai apasat de {count} ori</p>
		<button onClick={() => setCount(count + 1)}>Click +</button>
		<button onClick={() => setCount(count - 1)}>Click -</button>
		<button onClick={() => setCount(0)}>Reset</button>
	</div>
	);
}
export default App;