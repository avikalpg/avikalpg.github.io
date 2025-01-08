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

	// GitHub Repositories Carousel
	async function fetchGitHubRepos() {
		try {
			const response = await fetch('https://api.github.com/users/avikalpg/repos?sort=updated&direction=desc');
			const repos = await response.json();
			const filteredRepos = repos
			// .filter(repo => !repo.fork)
			// .sort((a, b) => b.stargazers_count - a.stargazers_count)

			const carouselTrack = $('.carousel-track');
			carouselTrack.empty(); // Clear existing slides

			filteredRepos.forEach(repo => {
				const repoCard = `
					<a href="${repo.html_url}" target="_blank" class="carousel-slide">
						<img src="https://github-readme-stats.vercel.app/api/pin/?username=${repo.owner.login}&repo=${repo.name}"
								alt="${repo.name}">
					</a>
				`;
				carouselTrack.append(repoCard);
			});

			// Reinitialize carousel functionality
			const slides = $('.carousel-slide');
			let currentIndex = 0;
			let isAutoScrolling = true;
			let autoScrollInterval;

			// Clone slides for infinite scroll
			slides.each(function () {
				const clone = $(this).clone();
				carouselTrack.append(clone);
			});

			function updateCarousel() {
				if (isAutoScrolling) {
					currentIndex += 0.1;
					carouselTrack.css('transform', `translateX(-${(currentIndex * 25)}%)`);

					// Reset when we've scrolled through all slides
					if (currentIndex >= slides.length) {
						currentIndex = 0;
						carouselTrack.css('transition', 'none');
						carouselTrack.css('transform', 'translateX(0)');

						// Trigger reflow
						carouselTrack[0].offsetHeight;

						// Restore transition
						carouselTrack.css('transition', 'transform 0.5s linear');
					}
				}
			}

			// Start auto-scrolling
			autoScrollInterval = setInterval(updateCarousel, 300);

			// Pause auto-scrolling when user interacts
			carouselTrack.on('mouseenter', function () {
				isAutoScrolling = false;
			});

			// Resume auto-scrolling when mouse leaves
			carouselTrack.on('mouseleave', function () {
				isAutoScrolling = true;
			});
		} catch (error) {
			console.error('Error fetching GitHub repositories:', error);
		}
	}

	// Fetch repositories on page load
	fetchGitHubRepos();

	// Modal close when clicking outside
	$(window).on('click', function (event) {
		const modal = $('#contact-modal');
		if (event.target === modal[0]) {
			modal.hide();
		}
	});
});
