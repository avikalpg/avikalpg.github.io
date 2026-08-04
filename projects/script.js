import { projectsData } from './data.js';

function createProjectCard(project) {
	return `
		<div class="project-card expandable">
			<div class="card-preview">
				<h3>${project.title}</h3>
				<p>${project.shortDescription}</p>
				<button class="expand-btn">Learn More</button>
			</div>
			<div class="card-details">
				<div class="details-content">
					${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
					<div class="tech-stack">
						${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
					</div>
					${project.fullDescription ? `
						<h4>Project Overview</h4>
						<p>${project.fullDescription}</p>
					` : ''}
					<div class="project-links">
						${project.links.map(link => `
							<a href="${link.url}" target="_blank">${link.text}</a>
						`).join('')}
					</div>
				</div>
			</div>
		</div>
	`;
}

function getProjectsByCategory(categoryId) {
	if (categoryId === 'all') {
		return projectsData.projects;
	}
	return projectsData.projects.filter(project =>
		project.categories.includes(categoryId)
	);
}

function renderProjects(categoryId = 'all') {
	const projectsContainer = document.querySelector('.projects-grid');
	const projects = getProjectsByCategory(categoryId);
	const category = projectsData.categories.find(item => item.id === categoryId);
	const heading = document.getElementById('projects-list-heading');

	heading.textContent = category ? category.name : 'All Projects';
	projectsContainer.innerHTML = projects.map(createProjectCard).join('');
}

function renderAchievements() {
	const achievementsContainer = document.querySelector('.achievements-grid');
	achievementsContainer.innerHTML = projectsData.achievements.map(achievement => `
		<article class="achievement-card">
			<h3>${achievement.title}</h3>
			<p>${achievement.description}</p>
		</article>
	`).join('');
}

// Consolidated event listeners
document.addEventListener('DOMContentLoaded', () => {
	renderProjects();
	renderAchievements();

	// Handle all click events through event delegation
	document.addEventListener('click', (e) => {
		// Filter buttons
		if (e.target.classList.contains('filter-btn')) {
			document.querySelectorAll('.filter-btn').forEach(btn =>
				btn.classList.remove('active')
			);
			e.target.classList.add('active');
			renderProjects(e.target.dataset.filter);
		}

		// Expand buttons
		if (e.target.classList.contains('expand-btn')) {
			const card = e.target.closest('.project-card');
			card.classList.toggle('expanded');
			e.target.textContent = card.classList.contains('expanded') ? 'Show Less' : 'Learn More';
		}

		// Hamburger menu
		if (e.target.closest('.hamburger-menu')) {
			document.querySelector('.nav-menu').classList.toggle('active');
		}
	});
});

// Contact modal functions
window.openContactModal = () => {
	document.getElementById('contact-modal').style.display = 'flex';
};

window.closeContactModal = () => {
	document.getElementById('contact-modal').style.display = 'none';
};
