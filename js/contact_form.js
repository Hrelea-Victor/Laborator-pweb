function submitForm() {
	const form = document.querySelector("form");
	form.addEventListener("submit", function(event){
	
	
	const nume=document.getElementById("name").value;
	const email=document.getElementById("email").value;
	const message=document.getElementById("message").value;
	const subText=document.getElementById("feedback");
	if(nume.length < 2) {
		subText.textContent = "Numele trebuie sa fie de cel putin 2 caractere";
		subText.style.color = "red";
	}
		else if(message.length < 10) {
		subText.textContent = "Mesajul trebuie sa fie de cel putin 10 caractere";
		subText.style.color = "red";
	}
		else if(!(email.includes("@"))) {
		subText.textContent = "Email-ul trebuie sa contina @";
		subText.style.color = "red";
	}
		else {
		subText.textContent = "Totul este corect";
		subText.style.color = "green";
	}

	console.log(nume);
	console.log(email);
	console.log(message);
	console.warn("Goodbye World!");
	});
}
const dark =document.getElementById("Dark");
const ora=new Date().getHours();
const body = document.body;
const text=document.querySelector("header p");
body.classList.add('light-mode');


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
dark.addEventListener('click',function(event){
	if (body.classList.contains('light-mode')){
		body.classList.replace('light-mode', 'dark-mode');
		dark.textContent = 'Light Mode'
	} else {
		body.classList.replace('dark-mode', 'light-mode');
		dark.textContent = 'Dark Mode'
	}

});