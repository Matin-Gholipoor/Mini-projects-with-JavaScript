const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

loadPage();

document.querySelectorAll('input').forEach((input) => {
	input.addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			addNewBookmark();
		}
	});
});

document.querySelector('.js-add-button').addEventListener('click', addNewBookmark);

function addNewBookmark() {
	const name = document.querySelector('.js-name-input').value;
	const url = document.querySelector('.js-url-input').value;

	if (name && url) {
		if (document.querySelector('.js-url-input').checkValidity()) {
			document.querySelector('.js-name-input').value = '';
			document.querySelector('.js-url-input').value = '';

			bookmarks.push(
				{
					name,
					url
				}
			);

			saveBookmarks();
			loadPage();
		}
		else {
			window.alert('Please enter a valid URL starting with http:// or https://');
		}
	}
	else {
		window.alert('Please enter both name and URL.');
	}
}

function loadPage() {
	document.querySelector('.js-bookmark-list').innerHTML = '';

	bookmarks.forEach((bookmark) => {
		const newBookmark = `
			<div class="bookmark">
				<a href="${bookmark.url}">${bookmark.name}</a>
				<button class="remove-button js-remove-button">Remove</button>
      </div>
		`;

		document.querySelector('.js-bookmark-list').innerHTML += newBookmark;
	});
}

function saveBookmarks() {
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}