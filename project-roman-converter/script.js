const inputNumber = document.getElementById("number");
const outputText = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");
const convertForm = document.getElementById("converter-form");

function convertRoman(number) {
	const romanList = [
		{ value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
	];

	let result = "";

	romanList.forEach(roman => {
    while (number >= roman.value) {
      result += roman.symbol;
      number -= roman.value;
    }
  });

  return result;
};

function isValid(input) {
	const regex = /[e]/g;
	let dangerText = "";

	// Kalo user masukin "e" doang, yg kekirim jadi ""
	// Tapi kalo "123e12", yg kekirim tetep "123e12"

	if (input === "" || input.match(regex)) {
		dangerText = "Please enter a valid number.";
	} else if (parseInt(inputNumber.value) < 1) {
		dangerText = "Please enter a number greater than or equal to 1.";
	} else if (parseInt(inputNumber.value) > 3999) {
		dangerText = "Please enter a number less than or equal to 3999.";
	} else {
		return true;
	}

	outputText.innerText = dangerText;
	outputText.classList.add("danger");
	outputText.classList.remove("hidden");
	return false;
}

function displayOutput(input) {
	if (isValid(input)) {
		outputText.innerText = convertRoman(input);
		outputText.classList.remove("danger");
		outputText.classList.remove("hidden");
	}
}

convertBtn.addEventListener("click", function (e) {
	e.preventDefault();
	// console.log(inputNumber.value);
	// console.log(parseInt(inputNumber.value));
	displayOutput(inputNumber.value);
});




/*
	forEach itu ngeruntut romanList dari index 0.

	Tiap ngeruntur 1 index, ngulang & ngecek (kodisi while nya) dulu
	apa angkanya masih lebih gede dari yang romanList index itu.

	Kalo ya, tambahin simbol angka romawinya & kurangin nilai numbernya
	dan balik ngecek kondisi while nya lagi.

	Kalo ga, pindah ke runtutan forEach romanList selanjutnya
	dan ulangi proses perulangan while nya
*/

/*
	Contoh kalo masukin angka 1234:

		runtutan romanList index 0: value: 1000, symbol: 'M'
			ya 1234 lebih gede atau setara dari 1000
			result: M
			number: 234
			udh ga lebih gede dari 1000

		runtutan romanList index 1: value: 900, symbol: 'CM'
			ga lebih gede

		runtutan romanList index 2: value: 500, symbol: 'D'
			ga lebih gede

		runtutan romanList index 3: value: 400, symbol: 'CD'
			ga lebih gede

		runtutan romanList index 4: value: 100, symbol: 'C'
			ya 234 lebih gede atau setara dari 100
			result: MC
			number: 134
			134 masih lebih gede atau setara dari 100
			result: MCC
			number: 34
			34 udh ga lebih gede dari 100

		runtutan romanList index 5: value: 90, symbol: 'XC'
			ga lebih gede

		runtutan romanList index 6: value: 50, symbol: 'L'
			ga lebih gede

		runtutan romanList index 7: value: 40, symbol: 'XL'
			ga lebih gede

		runtutan romanList index 8: value: 10, symbol: 'X'
			ya 34 lebih gede atau setara dari 10
			result: MCX
			number: 24
			24 masih lebih gede atau setara dari 10
			result: MCCXX
			number: 14
			14 masih ga lebih gede atau setara dari 10
			result: MCCXXX
			number: 4
			4 udh ga lebih gede dari 10

		runtutan romanList index 9: value: 9, symbol: 'IX'
			ga lebih gede

		runtutan romanList index 10: value: 5, symbol: 'V'
			ga lebih gede

		runtutan romanList index 11: value: 4, symbol: 'IV'
			ya 4 lebih gede atau setara dari 4
			result: MCCXXXIV
			number: 0
			0 udh ga lebih gede

		runtutan romanList index 12: value: 1, symbol: 'I
			ga lebih gede
*/