$(document).ready(function () {
	var blogsFolder = './blog/';

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
	$.get(base_folder + "/list_pages/all.html", function (htmlContent) {
		$("div#content").html(htmlContent);
	});

	$("div#menu a.tech").click(function () {
		$.get(base_folder + "/list_pages/tec.html", function (htmlContent) {
			$("div#content").html(htmlContent);
		});

		ga('create', 'UA-78761399-1', 'auto', 'techBlog');
		ga('send', 'pageview');
	});

	$("div#menu a.art").click(function () {
		$.get(base_folder + "/list_pages/art.html", function (htmlContent) {
			$("div#content").html(htmlContent);
		});

		ga('create', 'UA-78761399-1', 'auto', 'artBlog');
		ga('send', 'pageview');
	});

	$("div#menu a.fit").click(function () {
		$.get(base_folder + "/list_pages/fit.html", function (htmlContent) {
			$("div#content").html(htmlContent);
		});

		ga('create', 'UA-78761399-1', 'auto', 'fitBlog');
		ga('send', 'pageview');
	});

	$("div#menu a.entrepreneurship").click(function () {
		$.get(base_folder + "/list_pages/ent.html", function (htmlContent) {
			$("div#content").html(htmlContent);
		});

		ga('create', 'UA-78761399-1', 'auto', 'entrepreneurBlog');
		ga('send', 'pageview');
	});

	$("div#menu a.sdg").click(function () {
		$.get(base_folder + "/list_pages/sdg.html", function (htmlContent) {
			$("div#content").html(htmlContent);
		});

		ga('create', 'UA-78761399-1', 'auto', 'sdgBlog');
		ga('send', 'pageview');
	});

	$("div#menu a.all").click(function () {
		$.get(base_folder + "/list_pages/all.html", function (htmlContent) {
			$("div#content").html(htmlContent);
		});

		ga('create', 'UA-78761399-1', 'auto');
		ga('send', 'pageview');
	});

	// Modal Functionality
	function openContactModal() {
		$('#contact-modal').show();
	}

	function closeContactModal() {
		$('#contact-modal').hide();
	}

	// Attach modal functions to global scope
	window.openContactModal = openContactModal;
	window.closeContactModal = closeContactModal;

	function toggleMenu() {
		const navMenu = document.querySelector('.nav-menu');
		const hamburger = document.querySelector('.hamburger-menu');

		navMenu.classList.toggle('active');

		// Optional: Animate hamburger to close icon
		hamburger.classList.toggle('open');
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