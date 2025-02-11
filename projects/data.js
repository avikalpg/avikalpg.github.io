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
			title: "Vibinex",
			shortDescription: "The most intuitive UI to understand code changes. ",
			fullDescription: "Through a combination of a GitHub App and a browser extension, Vibinex visualizes the changes as a graph and adds necessary context on the review interface. It helps developers navigate and comprehend codebases more efficiently.",
			techStack: ["JavaScript", "Chrome Extensions API", "Natural Language Processing"],
			categories: ["dev-tools", "startups", "ai-ml"],
			links: [
				{
					text: "Visit Website",
					url: "https://vibinex.com"
				},
				{
					text: "Install Extension",
					url: "https://chromewebstore.google.com/detail/vibinex-code-review/jafgelpkkkopeaefadkdjcmnicgpcncc"
				}
			],
			featured: true
		},
		{
			title: "#PUMADive AI Engine",
			shortDescription: "Built the core AI model for PUMA's viral marketing campaign.",
			fullDescription: "As a part of KhiladiPro's team, developed the AI engine that analyzed user-submitted photos to detect and score their resemblance to PUMA's iconic logo leap, powering a viral marketing campaign that engaged millions of sports fans.",
			image: "path/to/puma-dive-image.jpg",
			techStack: ["Computer Vision", "Deep Learning", "Python", "Hugging Face"],
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
			title: "Alokit.in",
			shortDescription: "Technical team building platform for outsourcing development and running a robust hiring process.",
			fullDescription: "In 2020, when students were loosing internship opportunities, I built this platform to connect students with professionals and engage them in an audition project - a tool that safeguards both parties using monetary investments and payouts.",
			techStack: ["ReactJS", "Node.js", "Firebase", "Material UI"],
			categories: ["startups", "dev-tools"],
			links: [
				{
					text: "Start an audition project",
					url: "https://alokit.in"
				}
			],
			featured: true
		},
		{
			title: "Free Time",
			shortDescription: "Tool to help you recognize the amount of time you have in your life for things that you love.",
			fullDescription: "This ReactNative app uses a simple premise that there are 168 hours in a week and uses simple math to bring out an impactful insight and helps its users prioritize. It then uses the in-browser PromptAPI to provide time management suggestions.",
			techStack: ["JavaScript", "React Native", "Expo", "Recharts", "Gemini Nano"],
			categories: ["social", "ai-ml"],
			links: [
				{
					text: "Try it now!",
					url: "https://myfreetimeinaweek.in"
				}
			]
		},
		{
			title: "Sudoku Helper",
			shortDescription: "A Chrome extension that helps solve Sudoku puzzles with ease.",
			techStack: ["JavaScript", "Chrome Extensions API"],
			categories: ["dev-tools", "games"],
			links: [
				{
					text: "Install on Chrome",
					url: "https://chromewebstore.google.com/detail/sudoku-solver/hbnnbafoijebdcdgicccgjmmhlabimgo"
				}
			]
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
			title: "Typing Analyst",
			shortDescription: "A tool that analyzes your typing speed and accuracy to help you improve.",
			techStack: ["JavaScript", "HTML5", "CSS3"],
			categories: ["dev-tools", "social"],
			links: [
				{
					text: "Get started!",
					url: "https://typing-analyst.vercel.app"
				}
			]
		},
		{
			title: "HustlerIDE",
			shortDescription: "A Visual Studio Code extension that enhances your coding experience.",
			techStack: ["TypeScript", "VS Code API"],
			categories: ["dev-tools"],
			links: [
				{
					text: "Install now!",
					url: "https://marketplace.visualstudio.com/items?itemName=vibinex.hustler"
				}
			]
		},
		{
			title: "Poker Bot-Arena",
			shortDescription: "Converted a project that lets you practice Poker with friends into a project that lets you practice Poker with bots.",
			techStack: ["Python", "AI/ML", "WebSocket"],
			categories: ["ai-ml", "games"],
			links: [
				{
					text: "Source code",
					url: "https://github.com/avikalpg/poker-bot-arena"
				}
			]
		},
		{
			title: "Visual guidance for 3-dof robotic arm",
			shortDescription: "Using cameras to map collision-free paths for articulated arms, blending robotics and computer vision",
			techStack: ["Computer Vision", "Robotics", "Python"],
			categories: ["ai-ml"],
			links: [
				{
					text: "Report",
					url: "/archive/cs498a/FinalReport.pdf"
				}
			]
		},
		{
			title: "Car sim in C++",
			shortDescription: "A car simulation created using the open-GL library (intended to be a game)",
			techStack: ["C++", "OpenGL"],
			categories: ["games"],
			links: [
				{
					text: "Download & Run",
					url: "https://github.com/avikalpg/Graphics"
				}
			]
		},
		{
			title: "Indian Voting Assistant",
			shortDescription: "A personalised helper for voters in Indian Elections for only viewing information relevant to them for casting a vote.",
			techStack: ["React", "Node.js"],
			categories: ["social"],
			links: [
				{
					text: "Source code (WIP)",
					url: "https://github.com/avikalpg/IndianVotingAssistant"
				}
			]
		},
		{
			title: "Course Helper",
			shortDescription: "An Android app to guide IIT Kanpur students in selecting the right courses, tracking credits, and optimizing their academic journey",
			techStack: ["Android", "Java"],
			categories: ["social"],
			links: [
				{
					text: "Report",
					url: "/archive/cs654/project/helper-cs654a-project.pdf"
				}
			]
		},
		{
			title: "Pristine: IoT garbage tracking",
			shortDescription: "An Android app that tracks the location of lo-tech SIM-enabled plastic boxes using just the tower id sent as SMS.",
			techStack: ["Android", "IoT", "Java"],
			categories: ["social"],
			links: [
				{
					text: "Source code",
					url: "https://github.com/avikalpg/Pristine/"
				}
			]
		},
		{
			title: "Games Collection",
			shortDescription: "Open-source games: Fingersss, Othello, Two cars",
			techStack: ["JavaScript", "HTML5 Canvas"],
			categories: ["games"],
			links: []
		}
	]
};

export { projectsData };