import { useState, useEffect } from 'react';
import Card from './Card';
function UserList() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [filter, setFilter] = useState('');
useEffect(function() {
fetch('https://jsonplaceholder.typicode.com/users')
.then(function(response) {
return response.json();
})
.then(function(data) {
setUsers(data.users);
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
{users.filter(function(p) { 
return p.title.toLowerCase().includes(filter.toLowerCase()); }).map(function(item, index) {
return <Card key={item.id} title={item.username} description={item.email}/>;
})}
</div>
);
}
export default UserList;

