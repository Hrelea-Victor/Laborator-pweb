const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
.then(function() {
console.log('Conectat la MongoDB!');
})
.catch(function(err) {
console.error('Eroare conectare MongoDB:', err);
});
const PORT = 3000;
// Prima ruta: raspunde la GET /
app.use(express.json());
app.get('/', function(req, res) {
	res.json({ message: 'Serverul functioneaza!' });
});
// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const Project = require('./models/Project');

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', async function(req, res) {
	try {
		const projects = await Project.find();
		res.json(projects);
	} catch (err) {
		res.status(500).json({ error : 'Eroare ' + err });
	}
	
});
/* GET pt proiecte individuale
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
*/
// POST /api/projects - adauga un proiect nou
app.post('/api/projects', async function(req, res) {
	try { 
		const newProject = new Project({
			title: req.body.title,
			tech: req.body.tech,
			done: req.body.done || false,
		});
		const saved = await newProject.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: err.message});
	}
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