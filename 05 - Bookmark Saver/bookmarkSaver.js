const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [
	{
		name: 'Google',
		url: 'https://google.com'
	},
	{
		name: 'YouTube',
		url: 'https://youtube.com'
	}
];

loadPage();

function loadPage() {
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