// Google Analytics Module
const analytics = {
	init() {
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', 'G-QPXD79N14E');
	}
};

// Modal Module
const contactModal = {
	open() {
		$('#contact-modal').show();
	},

	close() {
		$('#contact-modal').hide();
	},

	init() {
		window.openContactModal = this.open;
		window.closeContactModal = this.close;

		$(window).on('click', (event) => {
			const modal = $('#contact-modal');
			if (event.target === modal[0]) {
				modal.hide();
			}
		});
	}
};

// GitHub Carousel Module
const githubCarousel = {
	async fetchRepos() {
		try {
			const response = await fetch('https://api.github.com/users/avikalpg/repos?sort=updated&direction=desc');
			const repos = await response.json();
			return repos
			// .filter(repo => !repo.fork)
			// .sort((a, b) => b.stargazers_count - a.stargazers_count)
		} catch (error) {
			console.error('Error fetching GitHub repositories:', error);
			return [];
		}
	},

	createRepoCard(repo) {
		return `
			<a href="${repo.html_url}" target="_blank" class="carousel-slide">
				<img src="https://github-readme-stats.vercel.app/api/pin/?username=${repo.owner.login}&repo=${repo.name}"
						alt="${repo.name}">
			</a>
		`;
	},

	setupCarousel(carouselTrack, slides) {
		let currentIndex = 0;
		let isAutoScrolling = true;
		let autoScrollInterval;

		slides.each(function () {
			const clone = $(this).clone();
			carouselTrack.append(clone);
		});

		const updateCarousel = () => {
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

		autoScrollInterval = setInterval(updateCarousel, 300);

		carouselTrack.on('mouseenter', () => isAutoScrolling = false);
		carouselTrack.on('mouseleave', () => isAutoScrolling = true);
	},

	async init() {
		const repos = await this.fetchRepos();
		const carouselTrack = $('.carousel-track');
		carouselTrack.empty();

		repos.forEach(repo => {
			carouselTrack.append(this.createRepoCard(repo));
		});

		this.setupCarousel(carouselTrack, $('.carousel-slide'));
	}
};

// Navigation Menu Module
const navigation = {
	toggle() {
		const navMenu = document.querySelector('.nav-menu');
		const hamburger = document.querySelector('.hamburger-menu');
		navMenu.classList.toggle('active');
	},

	init() {
		window.toggleMenu = this.toggle;

		document.addEventListener('click', (event) => {
			const navMenu = document.querySelector('.nav-menu');
			const hamburger = document.querySelector('.hamburger-menu');

			if (!navMenu.contains(event.target) &&
				!hamburger.contains(event.target) &&
				navMenu.classList.contains('active')) {
				navMenu.classList.remove('active');
				hamburger.classList.remove('open');
			}
		});
	}
};

// Initialize everything when document is ready
$(document).ready(function () {
	analytics.init();
	contactModal.init();
	githubCarousel.init();
	navigation.init();
});
