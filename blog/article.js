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

function createArticleIdFromMeta() {
	var dateMeta = document.querySelector('meta[name="date"]');
	var titleMeta = document.querySelector('meta[name="title"]');
	var articleId = '';

	if (dateMeta && titleMeta) {
		var date = dateMeta.getAttribute('content').replace(/\s+/g, '-').toLowerCase();
		var title = titleMeta.getAttribute('content').replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
		articleId = `${date}-${title}`;
	} else {
		articleId = 'default-article-id';
	}
	return articleId;
}

/** Add view counter and like button dynamically */
function addCounterElements() {
	// Get the article identifier from the filename or another unique attribute
	var articleId = createArticleIdFromMeta();

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
		})
		.catch(error => {
			console.error(`Failed to fetch view count: ${error}`);
			viewCounter.innerHTML = 'Error';
		});

	// Fetch and update like count
	fetch(`https://counterapi.com/api/avikalpg.github.io/vote/blogvote_${articleId}?readOnly=true&behavior=vote&icon=heart`)
		.then(response => response.json())
		.then(data => {
			console.log(`Votes response: ${JSON.stringify(data)}`);
			likeButton.innerHTML = `${data.iconSvg} ${data.value}`;
		})
		.catch(error => {
			console.error(`Failed to fetch like count: ${error}`);
			likeButton.innerHTML = 'Error';
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
			})
			.catch(error => {
				console.error(`Failed to fetch like count: ${error}`);
				alert('Failed to register your like. Please try again.');
				likeButton.title = 'Like this article';
			});
	});
}
