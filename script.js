const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("passwordGeneratorForm");
const includeUpperCaseElement = document.getElementById("includeUpperCase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const passwordDisplay = document.getElementById("passwordDisplay");

const UPPERCASE_CHAR_CODES = arrayFromHighToLow(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromHighToLow(97, 122);
const NUMBERS_CHAR_CODES = arrayFromHighToLow(48, 57);
const SYMBOLS_CHAR_CODES = arrayFromHighToLow(33, 47)
  .concat(arrayFromHighToLow(58, 64))
  .concat(arrayFromHighToLow(91, 96))
  .concat(arrayFromHighToLow(123, 126));

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const characterAmount = characterAmountNumber.value;
  const includeUpperCase = includeUpperCaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;

  passwordDisplay.innerText = generatePassword(
    characterAmount,
    includeUpperCase,
    includeNumbers,
    includeSymbols,
  );
});

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

function generatePassword(
  characterAmount,
  includeUpperCase,
  includeNumbers,
  includeSymbols,
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUpperCase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromHighToLow(low, high) {
  let array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
