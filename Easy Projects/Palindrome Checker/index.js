const input = document.getElementById("input");

function check() {
  const value = input.value;
  const reverse = reverseString(value);
  if (reverse.toLowerCase() === value.toLowerCase()) {
    alert(`"${value}" is palindrome.`);
  } else {
    alert(`"${value}" is not palindrome`);
  }

  input.value = ""; //to clear the input field.
}

function reverseString(str) {
  return str.split("").reverse().join("");
}
