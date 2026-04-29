const express = require('express');
const app = express();
const PORT = 3000;
// Prima ruta: raspunde la GET /
app.use(express.json());
app.get('/', function(req, res) {
	res.json({ message: 'Serverul functioneaza!' });
});
// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
	{ id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
	{ id: 2, title: "Calculator Buget", tech: "JS", done: true },
	{ id: 3, title: "Dashboard React", tech: "React", done: false },
	{ id: 4, title: "API Meteo", tech: "React, API", done: false },
];
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
	res.json(projects);
});
// GET pt proiecte individuale
app.get('/api/projects/:id', function(req, res) {
	if(projects.find(p => p.id === parseInt(req.params.id)))
		res.json(projects.find(p => p.id === parseInt(req.params.id)));
	else
		res.status(404).json({error: 'Not found' });
});

app.get('/api/stats', function(req, res) {
	const result = {
		"total": projects.length,
		"done": projects.filter(p => p.done).length,
		"in work" : projects.filter(p => !p.done).length,
	};
	res.json(result);
});

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
	 const newProject = {
		"id": projects.length + 1,
		"title": req.body.title,
		"tech": req.body.tech,
		"done": req.body.done || false,
	};
	console.log(newProject); 
	projects.push(newProject);
	res.status(201).json(newProject);
});

//delete
app.delete('/api/projects/:id', function(req, res) {
	const del_id = parseInt(req.params.id);
	const index = projects.findIndex(p => p.id === del_id);
	if (index === -1)
		res.status(404).json({error: 'Not found' });
	else{
		projects.splice(index, 1);
		res.json({message: 'Deleted'});
	}		
});

// Porneste serverul
app.listen(PORT, function() {
	console.log('Server pornit pe http://localhost:' + PORT);
});