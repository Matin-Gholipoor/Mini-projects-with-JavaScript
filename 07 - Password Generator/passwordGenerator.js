const passwordInput = document.querySelector(".js-password-input");
const lengthSlider = document.querySelector(".js-range-input");
const lengthDisplay = document.querySelector(".js-range-number");
const uppercaseCheckbox = document.getElementById("uppercase-input");
const lowercaseCheckbox = document.getElementById("lowercase-input");
const numbersCheckbox = document.getElementById("numbers-input");
const symbolsCheckbox = document.getElementById("symbols-input");
const generateButton = document.querySelector(".js-generate-button");
const copyButton = document.querySelector(".js-copy-icon");
const checkmarkIcon = document.querySelector('.js-checkmark-icon');
const strengthBar = document.querySelector(".js-strength-bar");
const strengthText = document.querySelector(".js-strength-level");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.value = 12;
lengthDisplay.textContent = lengthSlider.value;
uppercaseCheckbox.checked = true;
lowercaseCheckbox.checked = true;
numbersCheckbox.checked = true;
symbolsCheckbox.checked = true;

showPassword();

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordInput.value);

  checkmarkIcon.style.display = 'block';
  copyButton.style.display = 'none';
  setTimeout(() => {
    checkmarkIcon.style.display = 'none';
    copyButton.style.display = 'block';
  }, 1500);
});

generateButton.addEventListener('click', (event) => {
  event.preventDefault();
  showPassword();
});

lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
});

function generatePassword() {
  let generatedPassword = '';
  let characterSet = '';
  let passwordLength = lengthSlider.value;

  if (uppercaseCheckbox.checked) {
    generatedPassword += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
    passwordLength--;
    characterSet = [...characterSet, ...uppercaseLetters];
  }
  if (lowercaseCheckbox.checked) {
    generatedPassword += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
    passwordLength--;
    characterSet = [...characterSet, ...lowercaseLetters];
  }
  if (numbersCheckbox.checked) {
    generatedPassword += numberCharacters[Math.floor(Math.random() * numberCharacters.length)];
    passwordLength--;
    characterSet = [...characterSet, ...numberCharacters];
  }
  if (symbolsCheckbox.checked) {
    generatedPassword += symbolCharacters[Math.floor(Math.random() * symbolCharacters.length)];
    passwordLength--;
    characterSet = [...characterSet, ...symbolCharacters];
  }

  while (passwordLength > 0) {
    generatedPassword += characterSet[Math.floor(Math.random() * characterSet.length)];
    passwordLength--;
  }

  generatedPassword
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return generatedPassword;
}

function calculateStrength() {
  let strength = 0;

  if (uppercaseCheckbox.checked) {
    strength += 10;
  }
  if (lowercaseCheckbox.checked) {
    strength += 10;
  }
  if (numbersCheckbox.checked) {
    strength += 10;
  }
  if (symbolsCheckbox.checked) {
    strength += 10;
  }

  strength += Math.min(60, passwordInput.value.length * 3);

  return strength;
}

function showPassword() {
  if (!uppercaseCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !numbersCheckbox.checked &&
    !symbolsCheckbox.checked
  ) {
    window.alert('Please select at least one char type');
    return;
  }

  passwordInput.value = generatePassword();

  strengthBar.style.width = `${calculateStrength()}%`;
  strengthBar.classList.remove('strength-bar-weak');
  strengthBar.classList.remove('strength-bar-medium');
  strengthBar.classList.remove('strength-bar-strong');
  if (calculateStrength() < 33) {
    strengthBar.classList.add('strength-bar-weak');
    strengthText.textContent = 'Weak';
  }
  else if (calculateStrength() >= 33 && calculateStrength() < 66) {
    strengthBar.classList.add('strength-bar-medium');
    strengthText.textContent = 'Medium';
  }
  else if (calculateStrength() >= 66) {
    strengthBar.classList.add('strength-bar-strong');
    strengthText.textContent = 'Strong';
  }
}