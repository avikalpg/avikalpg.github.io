const projectsData = {
	categories: [
		{ id: "ai-ml", name: "AI & Machine Learning" },
		{ id: "dev-tools", name: "Developer Tools" },
		{ id: "startups", name: "Startups" },
		{ id: "social", name: "Social Impact" },
		{ id: "games", name: "Games & Sims" }
	],
	projects: [
		{
			title: "PUMA Dive AI Engine",
			shortDescription: "Built an AI model that detected and scored photos matching PUMA's iconic logo leap, powering a viral marketing campaign.",
			fullDescription: "Developed an AI engine that analyzed user-submitted photos to detect and score their resemblance to PUMA's iconic logo leap...",
			image: "path/to/puma-dive-image.jpg",
			techStack: ["Computer Vision", "Deep Learning", "Python"],
			categories: ["ai-ml"],
			links: [
				{
					text: "Case Study",
					url: "https://academy.schoolofmarketing.co.uk/puma-india-puma-dive-campaign-innovation/"
				}
			],
			featured: true
		},
		{
			title: "GitHub Skyline",
			shortDescription: "A web application that visualizes your GitHub contributions over time.",
			techStack: ["React", "GitHub API", "Three.js"],
			categories: ["dev-tools"],
			links: [
				{
					text: "Try it now!",
					url: "https://gitskyline.vercel.app"
				}
			],
			featured: true
		},
		{
			title: "Alokit.in",
			shortDescription: "Technical team building platform simplifying hiring processes",
			techStack: ["React", "Node.js", "MongoDB"],
			categories: ["startups", "dev-tools"],
			links: [
				{
					text: "Start an audition project",
					url: "https://alokit.in"
				}
			],
			featured: true
		}
	]
};

export { projectsData };