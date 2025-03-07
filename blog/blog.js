function loadCounterAPIScript(callback) {
	var script = document.createElement('script');
	script.src = 'https://counterapi.com/c.js';
	script.async = true;
	script.onload = callback;
	document.head.appendChild(script);
}

$(document).ready(function () {
	// Start Google Analytics
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }
	gtag('js', new Date());

	gtag('config', 'G-QPXD79N14E');
	// End Google Analytics

	var base_folder = window.location.href.substr(0, window.location.href.lastIndexOf("\/"));

	function scrollToActiveMenuItem() {
		const activeMenuItem = document.querySelector('#menu ul li.active');
		if (activeMenuItem) {
			activeMenuItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		}
	}

	// Centralized content loading function
	function loadBlogContent(category) {
		let categoryMap = {
			'tech': 'tec',
			'art': 'art',
			'fit': 'fit',
			'entrepreneurship': 'ent',
			'sdg': 'sdg',
			'all': 'all'
		};

		let fileName = categoryMap[category] + '.html';
		$.get(base_folder + "/list_pages/" + fileName, function (htmlContent) {
			// Restore the original page title when returning to blog list
			document.title = window.originalPageTitle || 'Avikalp Gupta | Blog';

			$("section#content").html(htmlContent);

			// Add click event for individual articles
			$("section#content .article").on('click', function (e) {
				e.preventDefault();
				let articleUrl = $(this).attr('href');
				loadArticleContent(articleUrl, category);
			});

			// Track page view for specific category
			gtag('event', 'blog_list_view', {
				'page_title': category + ' Blog',
				'page_path': '/blog/' + category
			});

			// Load the counter API script
			loadCounterAPIScript(function () {
				console.debug("Counter API script loaded.");
			});
		}).fail(function () {
			console.error("Failed to load blog content for category: " + category);
		});
	}

	// Function to load individual article content
	function loadArticleContent(articleUrl, category) {
		// Store the original page title globally if not already stored
		window.originalPageTitle = window.originalPageTitle || document.title;

		$.get(articleUrl, function (articleHtml) {
			// Create a container for the article with a back button
			let articleContainer = $('<div class="article-full-view"></div>');
			let backButton = $('<button class="back-to-list">← Back to Articles</button>');

			backButton.on('click', function () {
				loadBlogContent(category);  // Default back to all articles
			});

			// Create a temporary div to manipulate HTML
			let tempDiv = $('<div>').html(articleHtml);

			// Try to extract the meta name tag for the title
			let metaNameTitle = tempDiv.find('meta[name="title"]').attr('content') ||
				tempDiv.find('meta[property="og:title"]').attr('content') ||
				tempDiv.find('h1').first().text() ||
				tempDiv.find('h2').first().text() ||
				'Article';

			// Update page title
			document.title = metaNameTitle + " | Avikalp Gupta's Blog";

			// Function to rewrite local resource paths
			function rewriteResourcePath(originalPath) {
				// If it's an absolute path or external URL, return as is
				if (originalPath.startsWith('http') || originalPath.startsWith('//') || originalPath.startsWith('/')) {
					return originalPath;
				}

				// Determine the base path of the article
				let articleBasePath = articleUrl.substring(0, articleUrl.lastIndexOf('/') + 1);

				// Construct the full path
				return articleBasePath + originalPath;
			}

			// Rewrite image sources
			tempDiv.find('img').each(function () {
				let originalSrc = $(this).attr('src');
				if (originalSrc) {
					$(this).attr('src', rewriteResourcePath(originalSrc));
				}
			});

			// Rewrite anchor href for local links
			tempDiv.find('a').each(function () {
				let originalHref = $(this).attr('href');
				if (originalHref && !originalHref.startsWith('http') && !originalHref.startsWith('#')) {
					$(this).attr('href', rewriteResourcePath(originalHref));
				}
			});

			// Rewrite source for audio/video elements
			tempDiv.find('source').each(function () {
				let originalSrc = $(this).attr('src');
				if (originalSrc) {
					$(this).attr('src', rewriteResourcePath(originalSrc));
				}
			});

			// Rewrite script sources
			tempDiv.find('script').each(function () {
				let originalSrc = $(this).attr('src');
				if (originalSrc) {
					$(this).attr('src', rewriteResourcePath(originalSrc));
				}
			});

			// Rewrite link href for stylesheets
			tempDiv.find('link[rel="stylesheet"]').each(function () {
				let originalHref = $(this).attr('href');
				if (originalHref) {
					$(this).attr('href', rewriteResourcePath(originalHref));
				}
			});

			// Append back button and article content
			articleContainer.append(backButton);
			articleContainer.append(tempDiv.html());

			$("section#content").html(articleContainer);
			// Run the addCounterElements function from articles.js
			if (typeof addCounterElements === 'function') {
				addCounterElements();
			} else {
				console.error("addCounterElements function is not defined.");
			}

			// Send page view event to Google Analytics
			gtag('event', 'blog_article_view', {
				'page_title': metaNameTitle,
				'page_path': articleUrl
			});

			// Load the counter API script
			loadCounterAPIScript(function () {
				console.debug("Counter API script loaded.");
			});
		}).fail(function () {
			console.error("Failed to load article: " + articleUrl);
		});
	}

	// Event delegation for menu items
	$("#menu").on('click', 'li', function () {
		let category = $(this).data('category');
		loadBlogContent(category);

		// Add active state to clicked menu item
		$("#menu li").removeClass('active');
		$(this).addClass('active');
	});

	// Initial load of all articles
	loadBlogContent('all');
	$("#menu li[data-category='all']").addClass('active');
	scrollToActiveMenuItem()

	// Modal Functionality
	function openContactModal() {
		$('#contact-modal').fadeIn(300);
	}

	function closeContactModal() {
		$('#contact-modal').fadeOut(300);
	}

	// Attach modal functions to global scope
	window.openContactModal = openContactModal;
	window.closeContactModal = closeContactModal;

	function toggleMenu() {
		const navMenu = document.querySelector('.nav-menu');
		const hamburger = document.querySelector('.hamburger-menu');

		navMenu.classList.toggle('active');
	}

	// Close menu when clicking outside
	document.addEventListener('click', function (event) {
		const navMenu = document.querySelector('.nav-menu');
		const hamburger = document.querySelector('.hamburger-menu');

		if (!navMenu.contains(event.target) &&
			!hamburger.contains(event.target) &&
			navMenu.classList.contains('active')) {
			navMenu.classList.remove('active');
			hamburger.classList.remove('open');
		}
	});

	window.toggleMenu = toggleMenu;
});