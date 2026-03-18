import { useState } from 'react';
function ContactForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [feedback, setFeedback] = useState('');
	
	function handleSubmit() {
    if (name === '' || email === '' || message === '') {
      setFeedback('Completeaza toate campurile!');
    } else {
      setFeedback('Multumim, ' + name + '!');
    }};
	
	return (
		<div>
			<h3>Nota rapida</h3>
			<input
				value={name} onChange={(e) => setName(e.target.value)}
			/>
			<input
				value={email} onChange={(e) => setEmail(e.target.value)}
			/>
			<textarea
				value={message} onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={handleSubmit}>Submit</button>
			<p>Feedback : {feedback}</p>
			
		</div>
	);
}
export default ContactForm;