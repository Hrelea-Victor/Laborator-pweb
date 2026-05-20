import { useState, useEffect } from 'react';
function Home() {
	const [total, setTotal] = useState(0);
	const [done, setDone] = useState(0);
	const [inProgress, setInProgress] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(function () {
		fetch('http://localhost:3000/api/stats')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				setTotal(data.total);
				setDone(data.done);
				setInProgress(data.inProgress);
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
	return (
	<div>
		<div>
			<h2>Home</h2>
			<p>Bine ai venit pe dashboard-ul meu!</p>
		</div>
		<div>
			<p>Proiecte totale: {total}</p>
			<p>Proiecte terminate: {done}</p>
			<p>Proiecte in lucru: {inProgress}</p>
		</div>
	</div>
	);
}
export default Home;