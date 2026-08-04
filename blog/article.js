document.addEventListener('DOMContentLoaded', function () {
	fillDateFromMetaToBody();
	addCounterElements();
	addArticleNavigation();
});

/** Write the date based on the page's meta tag. */
function fillDateFromMetaToBody() {
	const publishDate = document.getElementById('publishDate');
	const dateMeta = document.querySelector('meta[name="date"]');

	if (publishDate && dateMeta) {
		publishDate.textContent = `Date: ${dateMeta.getAttribute('content')}`;
	}
}

/** Add view counter and like button dynamically. */
function addCounterElements() {
	const articleControls = document.querySelector('.article-controls');
	if (!articleControls) {
		return;
	}

	// Get the article identifier from the filename or another unique attribute
	const articleIdMeta = document.querySelector('meta[name="article-id"]');
	const articleId = articleIdMeta ? articleIdMeta.getAttribute('content') : 'default-article-id';

	// Create view counter element
	const viewCounter = document.createElement('div');
	viewCounter.className = 'viewCounter';
	viewCounter.title = 'Views';
	viewCounter.innerText = 'Loading...';

	// Create like button element
	const likeButton = document.createElement('button');
	likeButton.className = 'likeButton';
	likeButton.innerText = 'Like';
	likeButton.title = 'Like this article';
	if (localStorage.getItem(`blogvote_${articleId}`) === 'liked') {
		likeButton.classList.add('liked');
		likeButton.disabled = true;
		likeButton.title = 'Liked! Thanks <3';
	}

	// Append elements to the article-controls div
	articleControls.appendChild(viewCounter);
	articleControls.appendChild(likeButton);

	// Fetch and update view count
	fetch(`https://counter.avikalp.workers.dev/api/avikalpg.github.io/views/blogview_${articleId}`)
		.then(response => response.json())
		.then(data => {
			viewCounter.innerHTML = `${data.iconSvg} ${data.value}`;
		})
		.catch(error => {
			console.error(`Failed to fetch view count: ${error}`);
			viewCounter.innerHTML = 'Error';
		});

	// Fetch and update like count (readOnly=true → outline heart, no increment)
	fetch(`https://counter.avikalp.workers.dev/api/avikalpg.github.io/vote/blogvote_${articleId}?readOnly=true`)
		.then(response => response.json())
		.then(data => {
			likeButton.innerHTML = `${data.iconSvg} ${data.value}`;
		})
		.catch(error => {
			console.error(`Failed to fetch like count: ${error}`);
			likeButton.innerHTML = 'Error';
		});

	// Add event listener to like button
	likeButton.addEventListener('click', () => {
		fetch(`https://counter.avikalp.workers.dev/api/avikalpg.github.io/vote/blogvote_${articleId}`)
			.then(response => response.json())
			.then(data => {
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

/**
 * Add chronological previous/next links using the generated article list.
 * The list is already sorted newest-first by src/blog_lists.py, so no second
 * manually maintained article manifest is needed here.
 */
async function addArticleNavigation() {
	try {
		const response = await fetch('../list_pages/all.html');
		if (!response.ok) {
			throw new Error(`Article list request failed with status ${response.status}`);
		}

		const listDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
		const articles = Array.from(listDocument.querySelectorAll('a.article')).map(function (link) {
			const href = link.getAttribute('href') || '';
			return {
				filename: decodeURIComponent(href.split('/').pop()),
				title: link.querySelector('h2')?.textContent.trim() || 'Untitled article'
			};
		});
		const currentFilename = decodeURIComponent(window.location.pathname.split('/').pop());
		const currentIndex = articles.findIndex(function (article) {
			return article.filename === currentFilename;
		});

		if (currentIndex === -1) {
			return;
		}

		// Since the list is newest-first, the following item is chronologically
		// previous (older), while the preceding item is next (newer).
		const previousArticle = articles[currentIndex + 1];
		const nextArticle = articles[currentIndex - 1];
		if (!previousArticle && !nextArticle) {
			return;
		}

		const navigation = document.createElement('nav');
		navigation.className = 'article-navigation';
		navigation.setAttribute('aria-label', 'More articles');

		if (previousArticle) {
			navigation.appendChild(createArticleNavigationLink(previousArticle, 'previous'));
		}
		if (nextArticle) {
			navigation.appendChild(createArticleNavigationLink(nextArticle, 'next'));
		}

		document.body.appendChild(navigation);
	} catch (error) {
		// Navigation is progressive enhancement; the article remains readable
		// if the generated list is temporarily unavailable.
		console.error(`Failed to add article navigation: ${error}`);
	}
}

function createArticleNavigationLink(article, direction) {
	const link = document.createElement('a');
	const isPrevious = direction === 'previous';
	link.className = `article-navigation__link article-navigation__link--${direction}`;
	link.href = article.filename;
	link.rel = isPrevious ? 'prev' : 'next';
	link.setAttribute('aria-label', `${isPrevious ? 'Previous' : 'Next'} article: ${article.title}`);

	const directionLabel = document.createElement('span');
	directionLabel.className = 'article-navigation__direction';
	directionLabel.textContent = isPrevious ? 'Previous article' : 'Next article';

	const title = document.createElement('strong');
	title.className = 'article-navigation__title';
	title.textContent = article.title;

	link.appendChild(directionLabel);
	link.appendChild(title);
	return link;
}
