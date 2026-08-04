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
			title: "Wrong by Default",
			shortDescription: "A practical field guide to the failure modes experienced AI builders learn to avoid.",
			fullDescription: "Wrong by Default collects the counterintuitive lessons that separate reliable AI products from impressive demos, making hard-earned product and engineering instincts easier to recognize and apply.",
			techStack: ["AI Product Engineering", "Technical Writing"],
			categories: ["ai-ml", "dev-tools"],
			links: [{ text: "Read the guide", url: "https://wrongbydefault.com" }],
			featured: true
		},
		{
			title: "BYOK Relay",
			shortDescription: "An open-source relay that lets browser apps use their users' own AI API keys safely.",
			fullDescription: "BYOK Relay removes the CORS and key-exposure problems that make bring-your-own-key support difficult in frontend-only AI products. It encrypts provider keys server-side, returns a relay token, and proxies requests to OpenAI, Anthropic, and Gemini without requiring every app to build its own backend.",
			techStack: ["TypeScript", "Cloudflare Workers", "OpenAI", "Anthropic", "Gemini"],
			categories: ["ai-ml", "dev-tools"],
			links: [
				{ text: "Visit Website", url: "https://byokrelay.com" },
				{ text: "Source Code", url: "https://github.com/avikalpg/byok-relay" }
			],
			featured: true
		},
		{
			title: "Nextahalli",
			shortDescription: "Digital solutions designed for local businesses.",
			fullDescription: "Nextahalli helps neighbourhood businesses establish a useful digital presence with practical, locally focused technology rather than one-size-fits-all software.",
			techStack: ["Web Development", "Digital Services"],
			categories: ["startups", "social"],
			links: [{ text: "Visit Website", url: "https://nextahalli.com" }],
			featured: true
		},
		{
			title: "Wildest AI",
			shortDescription: "Developer tools for understanding AI-generated code and reviewing structural changes.",
			fullDescription: "Wildest AI helps developers understand AI-written code through deterministic, structure-aware diffs. Its DiffGraph tooling turns code changes into an explorable graph so reviewers can reason about intent and impact instead of reading a flat patch alone.",
			techStack: ["TypeScript", "Tree-sitter", "VS Code", "Developer Tools"],
			categories: ["ai-ml", "dev-tools", "startups"],
			links: [{ text: "Visit Website", url: "https://wildestai.com" }],
			featured: true
		},
		{
			title: "Vibinex",
			shortDescription: "The most intuitive UI to understand code changes.",
			fullDescription: "Through a combination of a GitHub App and a browser extension, Vibinex visualizes changes as a graph and adds necessary context to the review interface. It helps developers navigate and comprehend codebases more efficiently.",
			techStack: ["JavaScript", "Chrome Extensions API", "Natural Language Processing"],
			categories: ["dev-tools", "startups", "ai-ml"],
			links: [
				{ text: "Visit Website", url: "https://vibinex.com" },
				{ text: "Install Extension", url: "https://chromewebstore.google.com/detail/vibinex-code-review/jafgelpkkkopeaefadkdjcmnicgpcncc" }
			],
			featured: true
		},
		{
			title: "#PUMADive AI Engine",
			shortDescription: "Built the core AI model for PUMA's viral marketing campaign.",
			fullDescription: "As a part of KhiladiPro's team, developed the AI engine that analyzed user-submitted photos to detect and score their resemblance to PUMA's iconic logo leap, powering a viral marketing campaign that engaged millions of sports fans.",
			image: "/images/projects/puma-dive.jpg",
			techStack: ["Computer Vision", "Deep Learning", "Python", "Hugging Face"],
			categories: ["ai-ml"],
			links: [{ text: "Media Coverage", url: "https://www.financialexpress.com/business/brandwagon-puma-launches-ai-led-campaign-puma-dive-with-virat-kohli-3260697/" }],
			featured: true
		},
		{
			title: "Alokit.in",
			shortDescription: "Technical team building platform for outsourcing development and running a robust hiring process.",
			fullDescription: "In 2020, when students were losing internship opportunities, I built this platform to connect students with professionals and engage them in an audition project—a tool that safeguards both parties using monetary investments and payouts.",
			techStack: ["ReactJS", "Node.js", "Firebase", "Material UI"],
			categories: ["startups", "dev-tools", "social"],
			links: [{ text: "Start an audition project", url: "https://alokit.in" }],
			featured: true
		},
		{
			title: "Free Time",
			shortDescription: "Tool to help you recognize the amount of time you have in your life for things that you love.",
			fullDescription: "This React Native app uses a simple premise that there are 168 hours in a week and uses simple math to bring out an impactful insight and help its users prioritize. It then uses the in-browser Prompt API to provide time-management suggestions.",
			techStack: ["JavaScript", "React Native", "Expo", "Recharts", "Gemini Nano"],
			categories: ["social", "ai-ml"],
			links: [
				{ text: "Try it now", url: "https://myfreetimeinaweek.in" },
				{ text: "Source Code", url: "https://github.com/avikalpg/free-time" }
			]
		},
		{
			title: "Sudoku Helper",
			shortDescription: "A Chrome extension that gives visual hints and explains the next logical Sudoku move.",
			fullDescription: "Built for Usdoku.com, Sudoku Helper assists without simply revealing the answer. It highlights the board and explains the reasoning behind the next optimal move so players can improve their solving technique.",
			techStack: ["JavaScript", "Chrome Extensions API"],
			categories: ["dev-tools", "games"],
			links: [
				{ text: "Install on Chrome", url: "https://chromewebstore.google.com/detail/sudoku-solver/hbnnbafoijebdcdgicccgjmmhlabimgo" },
				{ text: "Source Code", url: "https://github.com/avikalpg/sudoku-helper" }
			]
		},
		{
			title: "GitHub Skyline",
			shortDescription: "A replacement for GitHub's retired 3D contribution-graph service.",
			fullDescription: "After GitHub deprecated Skyline, I built a replacement so my friends and I could continue generating and 3D-printing our contribution graphs. The project was later highlighted in a GitHub Community post.",
			techStack: ["React", "GitHub API", "Three.js"],
			categories: ["dev-tools"],
			links: [
				{ text: "Create your Skyline", url: "https://skyline3d.in" },
				{ text: "Source Code", url: "https://github.com/avikalpg/skyline" }
			],
			featured: true
		},
		{
			title: "Typing Analyst",
			shortDescription: "A tool that analyzes typing speed and accuracy independent of where you type.",
			techStack: ["JavaScript", "HTML5", "CSS3"],
			categories: ["dev-tools", "social"],
			links: [
				{ text: "Get started", url: "https://typing-analyst.vercel.app" },
				{ text: "Source Code", url: "https://github.com/avikalpg/typing-analyst" }
			],
			featured: true
		},
		{
			title: "WhatsApp AI Filter",
			shortDescription: "Filter the noise and focus on what matters in WhatsApp groups using AI.",
			fullDescription: "An open-source application that runs locally, monitors selected WhatsApp groups, and uses Perplexity or OpenAI to identify discussions that match your interests. Relevant messages trigger notifications while the rest stay out of the way.",
			techStack: ["TypeScript", "Node.js", "PM2", "Perplexity AI", "OpenAI API", "Next.js"],
			categories: ["ai-ml", "social"],
			links: [
				{ text: "Visit Website", url: "https://whatsapp-ai-filter.vercel.app" },
				{ text: "Source Code", url: "https://github.com/avikalpg/whatsapp-ai-filter" }
			],
			featured: true
		},
		{
			title: "HustlerIDE",
			shortDescription: "A VS Code extension that nudges builders to spend time on users and growth—not only code.",
			fullDescription: "Inspired by a Twitter thread, I spent a day off building a playful extension that reminds developers to prioritize user interviews and marketing alongside implementation. It is designed to keep product builders focused on the work that creates adoption.",
			techStack: ["TypeScript", "VS Code API"],
			categories: ["dev-tools"],
			links: [{ text: "Install Extension", url: "https://marketplace.visualstudio.com/items?itemName=vibinex.hustler" }]
		},
		{
			title: "Poker Friends Bot Interface",
			shortDescription: "Extended an open-source poker game with a comprehensive bot interface for RL training.",
			fullDescription: "To facilitate reinforcement-learning model training at GetMega, I adapted a multiplayer Texas Hold'em project so automated agents could join and play through a complete bot interface.",
			techStack: ["Python", "Reinforcement Learning", "WebSocket", "React"],
			categories: ["ai-ml", "games"],
			links: [
				{ text: "Bot Arena", url: "https://github.com/avikalpg/poker-bot-arena" },
				{ text: "Frontend Fork", url: "https://github.com/avikalpg/poker-ui" },
				{ text: "Backend Fork", url: "https://github.com/avikalpg/poker-api" }
			]
		},
		{
			title: "FarmBeats for India",
			shortDescription: "A balloon-based terrain-mapping system built for Microsoft's FarmBeats project.",
			fullDescription: "This project won the global Industry category in Microsoft's 2016 //oneweek hackathon. I developed a dual-app system: one application for smartphone-bearing helium balloons to map terrain, and another for farmers to monitor coverage in real time.",
			techStack: ["Android", "Computer Vision", "IoT", "Aerial Imaging"],
			categories: ["ai-ml", "social"],
			links: [
				{ text: "FarmBeats", url: "https://www.microsoft.com/en-us/research/project/farmbeats-iot-agriculture/" },
				{ text: "View Patent", url: "https://patents.google.com/patent/US20180213187A1/" }
			]
		},
		{
			title: "Visual Guidance for a 3-DOF Robotic Arm",
			shortDescription: "Computer-vision motion planning for articulated arms without traditional topological inputs.",
			fullDescription: "A research initiative extending visual motion planning from multiple robots in 2D to a three-dimensional robotic arm. The system used computer vision, object modelling, and generated visual manifolds to map collision-free paths.",
			techStack: ["Computer Vision", "Robotics", "Python", "V-REP"],
			categories: ["ai-ml"],
			links: [
				{ text: "Report", url: "/archive/cs498a/FinalReport.pdf" },
				{ text: "Source Code", url: "https://github.com/avikalpg/UGP-I" }
			]
		},
		{
			title: "InforMED Clinical Translation Prototype",
			shortDescription: "A focused clinical translation MVP designed to favour accuracy over broad language coverage.",
			fullDescription: "Built as a man-in-the-box prototype, InforMED demonstrated a specialized translation workflow for clinical settings. It deliberately narrowed the problem so medical conversations could be translated more reliably than with a general-purpose language tool.",
			techStack: ["Natural Language Processing", "Healthcare", "Rapid Prototyping"],
			categories: ["ai-ml", "startups", "social"],
			links: [{ text: "Source Code", url: "https://github.com/avikalpg/DropdownClinicalTranslate" }]
		},
		{
			title: "Pristine: IoT Waste Tracking",
			shortDescription: "A GSM-based system for mapping solid-waste logistics in Bengaluru from cell-tower data.",
			fullDescription: "Born from an interest in urban sanitation, Pristine used low-cost SIM-enabled tracking boxes to report nearby cell towers by SMS. An Android application interpreted that data to approximate locations and map waste movement without GPS hardware.",
			techStack: ["Android", "IoT", "Java", "GSM"],
			categories: ["social"],
			links: [{ text: "Source Code", url: "https://github.com/avikalpg/Pristine/" }]
		},
		{
			title: "Car Simulation in C++",
			shortDescription: "A car simulation and game prototype created with OpenGL.",
			techStack: ["C++", "OpenGL"],
			categories: ["games"],
			links: [{ text: "Source Code", url: "https://github.com/avikalpg/Graphics" }]
		},
		{
			title: "Indian Voting Assistant",
			shortDescription: "A personalized helper that shows Indian voters the information relevant to their ballot.",
			techStack: ["React", "Node.js"],
			categories: ["social"],
			links: [{ text: "Source Code (WIP)", url: "https://github.com/avikalpg/IndianVotingAssistant" }]
		},
		{
			title: "Course Helper",
			shortDescription: "An Android app helping IIT Kanpur students select courses, track credits, and plan their academic journey.",
			techStack: ["Android", "Java"],
			categories: ["social"],
			links: [{ text: "Report", url: "/archive/cs654/project/helper-cs654a-project.pdf" }]
		},
		{
			title: "Games Collection",
			shortDescription: "Open-source browser games including Fingersss, Othello, and Two Cars.",
			techStack: ["JavaScript", "HTML5 Canvas"],
			categories: ["games"],
			links: []
		}
	],
	achievements: [
		{
			title: "YSI Global 2018 — Earthpreneurs Winner",
			description: "InforMED Global won first place and 20,000 NOK in the Earthpreneurs pitch competition. Eight startup teams competed, formed from the top 24 SDG entrepreneurs selected by YSI Global from roughly 10,000 worldwide applicants."
		},
		{
			title: "Microsoft //oneweek 2016 — Global Industry Winner",
			description: "Our FarmBeats project won first place globally in the Industry category. Microsoft sponsored my first trip to the United States to discuss the project's future in Redmond. The work also produced the patent idea “Aerial Imaging of a Region using Helium-filled Balloons” (US Idea 13936)."
		},
		{
			title: "IIT-JEE 2012 — All India Rank 99",
			description: "Placed 99th nationally (99.98 percentile) in IIT-JEE, the highly competitive entrance examination for the Indian Institutes of Technology."
		},
		{
			title: "National Collegiate Dance & Football",
			description: "Won or finished runner-up in multiple national-level collegiate dance and football competitions as part of IIT Kanpur teams."
		}
	]
};

export { projectsData };
