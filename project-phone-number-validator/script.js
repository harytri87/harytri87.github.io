const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

function diplayResult(input) {

	if (input === "") {
		alert("Please provide a phone number");
		return;
	}

	const regex = /^1?[- ]?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

	let isValid = "";
	let result = "";

	if (regex.test(input)) {
		isValid = "valid";
		result = "Valid US number:";
	} else {
		isValid = "invalid";
		result = "Invalid US number:";
	}

	resultsDiv.innerHTML += 
	`
		<p class="result-text ${isValid}">${result} ${input}</p>
	`;

	userInput.value = "";
}

function displayClear() {
	resultsDiv.innerHTML = "";
}

checkBtn.addEventListener("click", function (e) {
	e.preventDefault();
	diplayResult(userInput.value);
});

clearBtn.addEventListener("click", function (e) {
	e.preventDefault();
	displayClear();
});


/*
	Penjelasan regex:
		/^								nandain itu awal dari string
		$/								nandain itu akhir dari string
											Jadi kalo ada 2 itu, artinya seluruh string harus cocok
		1?								Opsional angka 1 di depan ()
		[- ]?							Opsional antara strip atau 1 spasi
		(\(\d{3}\)|\d{3})	Kita pecah jelasinnya:
		\(\d{3}\)					3 digit di dalem kurung, kurungnya harus pake tanda \ buat escape
		|\d{3}						atau 3 digit aja
		\d{3} sama \d{4}	3 sama 4 digit aja
*/