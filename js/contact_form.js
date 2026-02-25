function submitForm() {
	const nume=document.getElementById("name").value;
	const email=document.getElementById("email").value;
	const message=document.getElementById("message").value;


	console.log(nume);
	console.log(email);
	console.log(message);
	console.warn("Goodbye World!");
}

const ora=new Date().getHours();
const text=document.querySelector("header p");
if (ora >= 6 && ora <= 11)
{
	text.textContent ="Buna dimineata! Bine ai venit pe pagina mea.";
}
else if (ora >= 12 && ora <= 17)
{
	text.textContent ="Buna ziua! Bine ai venit pe pagina mea.";
}
else {
	text.textContent ="Buna seara! Bine ai venit pe pagina mea.";
}