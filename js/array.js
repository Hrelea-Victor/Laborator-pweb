const lista = document.getElementById("education_list");
const array = [];
const array2 = [];
for (const li of lista.querySelectorAll('li')) {
	array.push(li.textContent);
	array2.push(li.textContent.split(" ")[0]);
}
for (let i = 0; i < array.length; i++){
	console.log(array[i]);
}
for (let i = 0; i < array.length; i++){
	if(array[i].includes("2010")){
		if(array[i].includes("2018")){
			console.log(array[i]);;
		}
	}
}
for (let i = 0; i < array2.length; i++){
	console.log(array2[i]);
}

const total = array.reduce((acc, lista) => {
  const years = lista.match(/\d{4}/g);
  const start = parseInt(years[0]);
  const end = parseInt(years[1]);
  return acc + (end - start);
}, 0);

console.log(`Total ani de studiu: ${total}`);
