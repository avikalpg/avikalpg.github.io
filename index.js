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

const profileLogos = {
	allLogos: [
		{
			name: 'Alokit',
			logo: 'Alokit.png',
			link: 'https://alokit.in'
		},
		{
			name: 'FOSS United',
			logo: 'FOSS_United.png',
			link: 'https://fossunited.org/'
		},
		{
			name: 'Fresh Gravity',
			logo: 'Fresh_Gravity.png',
			link: 'https://freshgravity.com'
		},
		{
			name: 'Google Developer Groups',
			logo: 'GDG.png',
			link: 'https://developers.google.com/community/gdg'
		},
		{
			name: 'Goldman Sachs',
			logo: 'Goldman_Sachs.svg',
			link: 'https://www.goldmansachs.com/'
		},
		{
			name: 'HSR HackerHouse',
			logo: 'hsrhackerhouse.png',
			link: 'https://hsrhackerhouse.lol'
		},
		{
			name: "IIT Kanpur",
			logo: 'IIT_Kanpur.png',
			link: 'https://iitk.ac.in/'
		},
		{
			name: 'InforMED',
			logo: 'informed.png',
			link: 'https://www.linkedin.com/in/informed-global-002a22169'
		},
		{
			name: 'Microsoft Research',
			logo: 'Microsoft_Research.png',
			link: 'https://www.microsoft.com/en-us/research/'
		},
		{
			name: 'Newton School',
			logo: 'Newton_School.png',
			link: 'https://newtonschool.co/'
		},
		{
			name: 'On Deck Founders (ODF)',
			logo: 'ODF.png',
			link: 'https://beondeck.com'
		},
		{
			name: 'Pariksha',
			logo: 'Pariksha.webp',
			link: 'https://www.linkedin.com/company/pariksha'
		},
		{
			name: 'Stanford University',
			logo: 'Stanford_University.webp',
			link: 'https://stanford.edu'
		},
		{
			name: 'Vibinex',
			logo: 'vibinex.png',
			link: 'https://vibinex.com'
		},
		{
			name: 'YSI Global',
			logo: 'Young_Sustainable_Impact.png',
			link: 'https://www.linkedin.com/company/ysi---young-sustainable-impact/'
		},
	],

	init() {
		const baseRadius = 150; // based on the width of profile-photo in layout.css
		const rotatingLogos = $('.rotating-logos');
		rotatingLogos.empty();
		this.allLogos.forEach((logoItem, idx) => {
			const offset = 0.6 * (Math.random() * 2 - 1); // 60% of full-length [-1,1]
			const orbitTilt = 0.6 * (Math.random() * 180 - 90); // 60% of full range [-90deg, 90deg]
			const radius = 5 + Math.sqrt(baseRadius ** 2 - ((offset * baseRadius) ** 2 * Math.cos(Math.PI * orbitTilt / 180) ** 2))
			console.log(`[profileLogos] ${logoItem.name}: offset=${offset}; orbitTilt=${orbitTilt}deg; radius: ${radius}`)
			const rotatingLogo = `
			<a href="${logoItem.link}" target="_blank" class="logo-item" style="--i:${idx}; --offset:${offset}; --orbit-tilt:${orbitTilt}deg; --radius:${radius}px">
				<img src="images/logos/${logoItem.logo}" alt="${logoItem.name}">
			</a>
			`
			rotatingLogos.append(rotatingLogo)
		})
	}
}

// Initialize everything when document is ready
$(document).ready(function () {
	analytics.init();
	contactModal.init();
	githubCarousel.init();
	navigation.init();
	profileLogos.init();
});
