import { useState, useEffect } from 'react';
import Card from './Card';
function ProjectList() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filter, setFilter] = useState('');
	const [title, setTitle] = useState('');
	const [tech, setTech] = useState('');
	useEffect(function () {
		fetch('http://localhost:3000/api/projects')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				setProjects(data);
				setLoading(false);
			})
			.catch(function (err) {
				setError('Eroare la incarcarea datelor');
				setLoading(false);
			});
	}, []);
	if (loading) {
		return <p>Se incarca...</p>;
	}
	if (error != null) {
		return <p>{error}</p>
	}
	async function handleSubmit() {
		try {
			const response = await fetch('http://localhost:3000/api/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: title, tech: tech }),
			});
			const newProject = await response.json();
			setProjects([...projects, newProject]);
			setTitle(''); // Goleste input-urile
			setTech('');
		} catch (err) {
			console.error('Eroare:', err);
		}
	}
	async function handleDelete(id) {
		try {
			const response = await fetch('http://localhost:3000/api/projects/' + id, {
				method: 'DELETE',
			});
			setProjects(projects.filter(p => p._id !== id))
		} catch (err) {
			console.error('Eroare:', err);
		}
	}
	async function handleToggle(id, currentDone){
		try{
			const response = await fetch('http://localhost:3000/api/projects/' + id, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ done: !currentDone}),
			});
			const updatedProject = await response.json();
			setProjects(projects.map(p => p._id === id ? updatedProject : p));
		} catch (err) {
			console.error('Eroare:', err);
		}
	}
	return (
		<div>
			<h3>Proiecte</h3>
			<input value={filter} onChange={(e) => setFilter(e.target.value)} />
			<ul>
				{projects.filter(function (p) {
					return p.title.toLowerCase().includes(filter.toLowerCase());
				}).map(function (item, index) {
					return (
						<li key={item.id}>
							<Card title={item.title} description={item.tech} done={item.done} />
							<button onClick={() => handleDelete(item._id)}>Delete</button>
							<button onClick={() => handleToggle(item._id, item.done)}>Toggle Done</button>
						</li>
					);
				})}
			</ul>
			<div>
				<p>Proiecte totale: {projects.length}</p>
				<p>Proiecte finalizate: {projects.filter(p => p.done).length}</p>
				<p>Proiecte in lucru: {projects.filter(p => !p.done).length}</p>
			</div>
			<div>
				<h3>Add a project</h3>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
				/>
				<input
					value={tech}
					onChange={(e) => setTech(e.target.value)}
					placeholder="Tech"
				/>
				<button onClick={handleSubmit}>Add</button>
			</div>
		</div>
	);
}
export default ProjectList;

