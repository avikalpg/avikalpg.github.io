$(document).ready(function () {
	// Start Google Analytics
	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date(); a = s.createElement(o),
			m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
	})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-78761399-1', 'auto');
	ga('send', 'pageview');
	// End Google Analytics

	var base_folder = window.location.href.substr(0, window.location.href.lastIndexOf("\/"));

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
			$("section#content").html(htmlContent);

			// Add click event for individual articles
			$("section#content .article").on('click', function (e) {
				e.preventDefault();
				let articleUrl = $(this).attr('href');
				loadArticleContent(articleUrl, category);
			});

			// Track page view for specific category
			ga('create', 'UA-78761399-1', 'auto', category + 'Blog');
			ga('send', 'pageview');
		}).fail(function () {
			console.error("Failed to load blog content for category: " + category);
		});
	}

	// Function to load individual article content
	function loadArticleContent(articleUrl, category) {
		$.get(articleUrl, function (articleHtml) {
			// Create a container for the article with a back button
			let articleContainer = $('<div class="article-full-view"></div>');
			let backButton = $('<button class="back-to-list">← Back to Articles</button>');

			backButton.on('click', function () {
				loadBlogContent(category);  // Default back to all articles
			});

			// Append back button and article content
			articleContainer.append(backButton);
			articleContainer.append(articleHtml);

			$("section#content").html(articleContainer);
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