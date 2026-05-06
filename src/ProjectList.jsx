import { useState, useEffect } from 'react';
import Card from './Card';
function ProjectList() {
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [filter, setFilter] = useState('');
useEffect(function() {
fetch('http://localhost:3000/api/projects')
.then(function(response) {
return response.json();
})
.then(function(data) {
setProjects(data);
setLoading(false);
})
.catch(function(err) {
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
return (
<div>
<h3>Proiecte</h3>
<input value={filter} onChange={(e) => setFilter(e.target.value)} />
{projects.filter(function(p) { 
return p.title.toLowerCase().includes(filter.toLowerCase()); }).map(function(item, index) {
return <Card key={item.id} title={item.title} description={item.tech} done={item.done}/>;
})}
<div>
<p>Proiecte totale: {projects.length}</p>
<p>Proiecte finalizate: {projects.filter(p => p.done).length}</p>
<p>Proiecte in lucru: {projects.filter(p => !p.done).length}</p>
</div>
</div>
);
}
export default ProjectList;

