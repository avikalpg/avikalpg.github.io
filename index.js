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

	// console.log(ga.q);

	$("div.wrapper div#main section#index").show();
	$("div.wrapper div#main section#acads").hide();
	$("div.wrapper div#main section#projects").hide();
	$("div.wrapper div#main section#extra").hide();
	$("div.wrapper div#main section#blog_content").hide();

	$("div.wrapper div#menu a.index").click(function () {
		$("div.wrapper div#main section#picture").show();
		$("div.wrapper div#main section#index").show();
		$("div.wrapper div#main section#acads").hide();
		$("div.wrapper div#main section#projects").hide();
		$("div.wrapper div#main section#extra").hide();
		$("div.wrapper div#main section#blog_content").hide();

		ga('create', 'UA-78761399-1', 'auto');
		ga('send', 'pageview');
	});
	$("div.wrapper div#menu a.acads").click(function () {
		$("div.wrapper div#main section#picture").show();
		$("div.wrapper div#main section#index").hide();
		$("div.wrapper div#main section#acads").show();
		$("div.wrapper div#main section#projects").hide();
		$("div.wrapper div#main section#extra").hide();
		$("div.wrapper div#main section#blog_content").hide();

		ga('create', 'UA-78761399-1', 'auto', 'acadsTracker');
		ga('acadsTracker.send', 'pageview');
	});
	$("div.wrapper div#menu a.projects").click(function () {
		$("div.wrapper div#main section#picture").show();
		$("div.wrapper div#main section#index").hide();
		$("div.wrapper div#main section#acads").hide();
		$("div.wrapper div#main section#projects").show();
		$("div.wrapper div#main section#extra").hide();
		$("div.wrapper div#main section#blog_content").hide();

		ga('create', 'UA-78761399-1', 'auto', 'projectsTracker');
		ga('projectsTracker.send', 'pageview');
	});
	$("div.wrapper div#menu a.extra").click(function () {
		$("div.wrapper div#main section#picture").show();
		$("div.wrapper div#main section#index").hide();
		$("div.wrapper div#main section#acads").hide();
		$("div.wrapper div#main section#projects").hide();
		$("div.wrapper div#main section#extra").show();
		$("div.wrapper div#main section#blog_content").hide();

		ga('create', 'UA-78761399-1', 'auto', 'extraTracker');
		ga('extraTracker.send', 'pageview');
	});
	$("div.wrapper div#menu a.blog").click(function () {
		$("div.wrapper div#main section#picture").hide();
		$("div.wrapper div#main section#index").hide();
		$("div.wrapper div#main section#acads").hide();
		$("div.wrapper div#main section#projects").hide();
		$("div.wrapper div#main section#extra").hide();
		$("div.wrapper div#main section#blog_content").show();
		$("div.wrapper div#main section#blog_content iframe").attr("src", function (i, val) { return val; });

		ga('create', 'UA-78761399-1', 'auto', 'blogTracker');
		ga('blogTracker.send', 'pageview');
	});

	// Add modal functionality
	document.addEventListener('DOMContentLoaded', function () {
		// Add modal close functionality when clicking outside the modal
		window.addEventListener('click', function (event) {
			const modal = document.getElementById('contact-modal');
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		});
	});

});
