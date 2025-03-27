// HTML elements
const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

// Taking only the alphabets and numbers then make it lowercase
function cleanInput(str){
  const regex = /[^A-Za-z0-9]/g;
  const lowerCase = str.toLowerCase();
  return lowerCase.replace(regex, '');
}

// Convert to array, reverse, convert back to string
function reverseInput(str) {
	let cleanedStr = cleanInput(str);

	let reversedStr = [...cleanedStr].reverse();
	reversedStr = reversedStr.join('');

	return reversedStr;
}

// Check 2 values if it's indentical + the result message
function checkPalindrome() {

	if (textInput.value === '') {
		// Empty input, give alert
		alert('Please input a value');
    return;
	}

	const cleanedInput = cleanInput(textInput.value);
	const reversedInput = reverseInput(cleanedInput);

	const resultState = cleanedInput === reversedInput ? "is" : "is not";
	const resultMsg = `${textInput.value} ${resultState} a palindrome.`;

	result.innerText = resultMsg;
	result.style.display = "block";
}

// Button clicked
checkBtn.addEventListener("click", () => {
	checkPalindrome();
	textInput.value = "";
});

// Enter key pressed
textInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkPalindrome();
		textInput.value = "";
  }
});