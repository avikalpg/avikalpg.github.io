document.addEventListener('DOMContentLoaded', function () {
	// Executing all the functions required
	fillDateFromMetaToBody();
	addCounterElements();
});

/** write the date based on meta tag */
function fillDateFromMetaToBody() {
	var meta_tags = document.getElementsByTagName('meta');
	for (i = 0; i < meta_tags.length; i++) {
		if (meta_tags[i].getAttribute('name') == 'date') {
			console.log(document.getElementById('publishDate').innerHTML);
			document.getElementById('publishDate').innerHTML = "Date: " + meta_tags[i].getAttribute('content');
		}
	}
}

/** Add view counter and like button dynamically */
function addCounterElements() {
	// Get the article identifier from the filename or another unique attribute
	var articleId = window.location.pathname.split('/').pop().split('.').shift();

	// Create view counter element
	var viewCounter = document.createElement('div');
	viewCounter.className = 'viewCounter';
	viewCounter.title = 'Views';
	viewCounter.innerText = 'Loading...';

	// Create like button element
	var likeButton = document.createElement('button');
	likeButton.className = 'likeButton';
	likeButton.innerText = 'Like';
	likeButton.title = 'Like this article';
	if (localStorage.getItem(`blogvote_${articleId}`) === 'liked') {
		likeButton.classList.add('liked');
		likeButton.disabled = true;
		likeButton.title = 'Liked! Thanks <3';
	}

	// Append elements to the article-controls div
	var articleControls = document.querySelector('.article-controls');
	if (articleControls) {
		articleControls.appendChild(viewCounter);
		articleControls.appendChild(likeButton);
	}

	// Fetch and update view count
	fetch(`https://counterapi.com/api/avikalpg.github.io/view/blogview_${articleId}`)
		.then(response => response.json())
		.then(data => {
			console.log(`Views response: ${JSON.stringify(data)}`);
			viewCounter.innerHTML = `${data.iconSvg} ${data.value}`;
		});

	// Fetch and update like count
	fetch(`https://counterapi.com/api/avikalpg.github.io/vote/blogvote_${articleId}?readOnly=true&behavior=vote&icon=heart`)
		.then(response => response.json())
		.then(data => {
			console.log(`Votes response: ${JSON.stringify(data)}`);
			likeButton.innerHTML = `${data.iconSvg} ${data.value}`;
		});

	// Add event listener to like button
	likeButton.addEventListener('click', () => {
		fetch(`https://counterapi.com/api/avikalpg.github.io/vote/blogvote_${articleId}?behavior=vote&icon=heart`)
			.then(response => response.json())
			.then(data => {
				console.log(`Votes response: ${JSON.stringify(data)}`);
				likeButton.innerHTML = `${data.iconSvg} ${data.value}`;
				likeButton.disabled = true;
				likeButton.classList.add('liked');
				localStorage.setItem(`blogvote_${articleId}`, 'liked');
				likeButton.title = 'Liked! Thanks <3';
			});
	});
}
