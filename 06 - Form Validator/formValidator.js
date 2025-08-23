document.querySelector('.js-submit-button').addEventListener('click', submit);

function submit(event) {
	event.preventDefault();

	const usernameInput = document.querySelector('.js-username-input');
	const emailInput = document.querySelector('.js-email-input');
	const passwordInput = document.querySelector('.js-password-input');
	const confirmPasswordInput = document.querySelector('.js-confirm-password-input');
	const usernameError = usernameInput.nextElementSibling;
	const emailError = emailInput.nextElementSibling;
	const passwordError = passwordInput.nextElementSibling;
	const confirmPasswordError = confirmPasswordInput.nextElementSibling;

	let isUsernameCorrect = true;
	let isEmailCorrect = true;
	let isPasswordCorrect = true;
	let isConfirmPasswordCorrect = true;

	usernameInput.classList.add('input-correct');
	usernameInput.classList.add('input-correct:focus');
	usernameError.textContent = '';
	emailInput.classList.add('input-correct');
	emailInput.classList.add('input-correct:focus');
	emailError.textContent = '';
	passwordInput.classList.add('input-correct');
	passwordInput.classList.add('input-correct:focus');
	passwordError.textContent = '';
	confirmPasswordInput.classList.add('input-correct');
	confirmPasswordInput.classList.add('input-correct:focus');
	confirmPasswordError.textContent = '';

	if (!usernameInput.value) {
		usernameError.textContent = 'Username is required.';

		if (!usernameInput.classList.contains('input-error')) {
			usernameInput.classList.add('input-error');
			usernameInput.classList.add('input-error:focus');
		}
		if (usernameInput.classList.contains('input-correct')) {
			usernameInput.classList.remove('input-correct');
			usernameInput.classList.remove('input-correct:focus');
		}

		isUsernameCorrect = false;
	}
	else if (usernameInput.value.length < 3) {
		usernameError.textContent = 'Username must be at least 3 characters.';

		if (!usernameInput.classList.contains('input-error')) {
			usernameInput.classList.add('input-error');
			usernameInput.classList.add('input-error:focus');
		}
		if (usernameInput.classList.contains('input-correct')) {
			usernameInput.classList.remove('input-correct');
			usernameInput.classList.remove('input-correct:focus');
		}

		isUsernameCorrect = false;
	}

	if (!emailInput.value) {
		emailError.textContent = 'Email is required.';

		if (!emailInput.classList.contains('input-error')) {
			emailInput.classList.add('input-error');
			emailInput.classList.add('input-error:focus');
		}
		if (emailInput.classList.contains('input-correct')) {
			emailInput.classList.remove('input-correct');
			emailInput.classList.remove('input-correct:focus');
		}

		isEmailCorrect = false;
	}
	else if (!emailInput.checkValidity()) {
		emailError.textContent = 'Email is not valid.';

		if (!emailInput.classList.contains('input-error')) {
			emailInput.classList.add('input-error');
			emailInput.classList.add('input-error:focus');
		}
		if (emailInput.classList.contains('input-correct')) {
			emailInput.classList.remove('input-correct');
			emailInput.classList.remove('input-correct:focus');
		}

		isEmailCorrect = false;
	}

	if (!passwordInput.value) {
		passwordError.textContent = 'Password is required.';

		if (!passwordInput.classList.contains('input-error')) {
			passwordInput.classList.add('input-error');
			passwordInput.classList.add('input-error:focus');
		}
		if (passwordInput.classList.contains('input-correct')) {
			passwordInput.classList.remove('input-correct');
			passwordInput.classList.remove('input-correct:focus');
		}

		isPasswordCorrect = false;
	}
	else if (passwordInput.value.length < 6) {
		passwordError.textContent = 'Password must be at least 6 characters.';

		if (!passwordInput.classList.contains('input-error')) {
			passwordInput.classList.add('input-error');
			passwordInput.classList.add('input-error:focus');
		}
		if (passwordInput.classList.contains('input-correct')) {
			passwordInput.classList.remove('input-correct');
			passwordInput.classList.remove('input-correct:focus');
		}

		isPasswordCorrect = false;
	}

	if (!confirmPasswordInput.value) {
		confirmPasswordError.textContent = 'Confirm Password is required.';

		if (!confirmPasswordInput.classList.contains('input-error')) {
			confirmPasswordInput.classList.add('input-error');
			confirmPasswordInput.classList.add('input-error:focus');
		}
		if (confirmPasswordInput.classList.contains('input-correct')) {
			confirmPasswordInput.classList.remove('input-correct');
			confirmPasswordInput.classList.remove('input-correct:focus');
		}

		isConfirmPasswordCorrect = false;
	}

	if (passwordInput.value && confirmPasswordInput.value) {
		if (passwordInput.value !== confirmPasswordInput.value) {
			confirmPasswordError.textContent = 'Passwords do not match.';

			if (!confirmPasswordInput.classList.contains('input-error')) {
				confirmPasswordInput.classList.add('input-error');
				confirmPasswordInput.classList.add('input-error:focus');
			}
			if (confirmPasswordInput.classList.contains('input-correct')) {
				confirmPasswordInput.classList.remove('input-correct');
				confirmPasswordInput.classList.remove('input-correct:focus');
			}

			isConfirmPasswordCorrect = false;
		}
	}

	if (
		isUsernameCorrect &&
		isEmailCorrect &&
		isPasswordCorrect &&
		isConfirmPasswordCorrect
	) {
		window.alert('Registration successful!');
		location.reload();
	}
}