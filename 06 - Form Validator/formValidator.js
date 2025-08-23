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

	if (!usernameInput.value) {
		usernameError.textContent = 'Username is required.';

		if (!usernameInput.classList.contains('input-error')) {
			usernameInput.classList.add('input-error');
			usernameInput.classList.add('input-error:focus');
		}
	}
	else if (usernameInput.value.length < 3) {
		usernameError.textContent = 'Username must be at least 3 characters.';

		if (!usernameInput.classList.contains('input-error')) {
			usernameInput.classList.add('input-error');
			usernameInput.classList.add('input-error:focus');
		}
	}

	if (!emailInput.value) {
		emailError.textContent = 'Email is required.';

		if (!emailInput.classList.contains('input-error')) {
			emailInput.classList.add('input-error');
			emailInput.classList.add('input-error:focus');
		}
	}
	else if (!emailInput.checkValidity()) {
		emailError.textContent = 'Email is not valid.';

		if (!emailInput.classList.contains('input-error')) {
			emailInput.classList.add('input-error');
			emailInput.classList.add('input-error:focus');
		}
	}

	if (!passwordInput.value) {
		passwordError.textContent = 'Password is required.';

		if (!passwordInput.classList.contains('input-error')) {
			passwordInput.classList.add('input-error');
			passwordInput.classList.add('input-error:focus');
		}
	}
	else if (passwordInput.value.length < 6) {
		passwordError.textContent = 'Password must be at least 6 characters.';

		if (!passwordInput.classList.contains('input-error')) {
			passwordInput.classList.add('input-error');
			passwordInput.classList.add('input-error:focus');
		}
	}

	if (!confirmPasswordInput.value) {
		confirmPasswordError.textContent = 'Confirm Password is required.';

		if (!confirmPasswordInput.classList.contains('input-error')) {
			confirmPasswordInput.classList.add('input-error');
			confirmPasswordInput.classList.add('input-error:focus');
		}
	}

	if (passwordInput.value && confirmPasswordInput.value) {
		if (passwordInput.value !== confirmPasswordInput.value) {
			confirmPasswordError.textContent = 'Passwords do not match.';

			if (!confirmPasswordInput.classList.contains('input-error')) {
				confirmPasswordInput.classList.add('input-error');
				confirmPasswordInput.classList.add('input-error:focus');
			}
		}
	}
}