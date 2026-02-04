export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    liveUrl: string;
    codeUrl: string;
    image?: string;
    content: string; // Markdown content for the details page
}

export const profile = {
    name: "Rakibul Hasan Shuvo",
    role: "Multidisciplinary Creative Developer",
    location: "Bangladesh",
    email: "m.rakibul.h45@gmail.com",
    resumeUrl: "/resume.pdf", // Path in public folder
    avatarUrl: "/rakibul.jpeg", // Path in public folder

    // Social Links
    social: {
        linkedin: "https://www.linkedin.com/in/muhammad-rakibul-hasan-shuvo-5783363a0",
        github: "https://github.com/rakibulhasanshuvo",
        twitter: "https://twitter.com/",
        instagram: "#"
    },

    // Hero Section
    hero: {
        tagline: "A multidisciplinary creative designing the future with code and intuition.",
        skills: [
            "Vibe Coder", "Graphic Design", "React", "Motion", "UX/UI", "Next.js", "TypeScript", "Cyber Security"
        ]
    },

    // About Section
    about: {
        title: "Crafting Digital Experiences with Passion",
        description: [
            "I'm Rakibul Hasan Shuvo, a multidisciplinary creative developer based in Bangladesh. I specialize in building premium digital experiences that blend clean code with intuitive design.",
            "My journey started with a curiosity for how things work on the web. Today, I transform that curiosity into impactful products — from sleek portfolios to complex web applications.",
            "When I'm not coding, you'll find me exploring cybersecurity, creating motion graphics, or vibing to new music. I believe the best work comes from passion and flow."
        ],
        stats: [
            { label: "Years Experience", value: "3+" },
            { label: "Projects Completed", value: "20+" },
            { label: "Happy Clients", value: "15+" }
        ]
    },

    // Tech Stack Section
    techStack: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind', icon: '🎨' },
        { name: 'Framer Motion', icon: '🎬' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Figma', icon: '🎯' },
        { name: 'Git', icon: '🔀' },
        { name: 'Python', icon: '🐍' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Docker', icon: '🐳' },
    ],

    // Services Section
    services: [
        {
            icon: "Code2", // Matches lucide-react component name
            title: "Engineering",
            description: "Building robust, scalable applications with modern technologies like React, Next.js, and Node.js."
        },
        {
            icon: "Palette",
            title: "Design",
            description: "Crafting intuitive user experiences and pixel-perfect high-fidelity UI designs using Figma."
        },
        {
            icon: "TrendingUp",
            title: "Strategy",
            description: "Optimizing for growth, SEO, and performance to ensure your digital presence makes an impact."
        }
    ],

    // Testimonials Section
    testimonials: [
        {
            quote: "Rakibul delivered exceptional work. His attention to detail and creative approach made our project stand out.",
            name: "Alex Johnson",
            title: "CEO, TechStart Inc.",
            avatar: "AJ"
        },
        {
            quote: "Working with Rakibul was a breeze. He understood our vision perfectly and executed it flawlessly.",
            name: "Sarah Chen",
            title: "Product Manager, DesignCo",
            avatar: "SC"
        },
        {
            quote: "The animations and interactions he created were beyond our expectations. Highly recommended!",
            name: "Mike Roberts",
            title: "Founder, CreativeAgency",
            avatar: "MR"
        }
    ],

    // Contact Section
    contact: {
        heading: "Let's Work Together",
        subheading: "Have a project in mind? Let's build something extraordinary."
    },

    // Projects Section
    projects: [
        {
            id: "stockniche-ai",
            title: "StockNiche AI",
            category: "AI & Finance",
            description: "Intelligent market analysis platform for Adobe Stock contributors. Features live trend analysis using Google Gemini API.",
            tags: ["React", "Gemini API", "Tailwind", "Next.js"],
            liveUrl: "#",
            codeUrl: "#",
            content: `
# StockNiche AI

StockNiche AI solves a critical problem for stock photographers: figuring out what to shoot next.

## The Problem
Stock photography is a volume game, but indiscriminately uploading images leads to low sales. Contributors need to know which niches are under-served but high-demand.

## The Solution
We built an AI-powered dashboard that:
1.  Analyzes current search trends.
2.  Suggests specific, description prompts for Midjourney or Real Photography.
3.  Estimates potential ROI for different niches.

## Tech Stack
-   **Frontend**: Next.js 14 (App Router)
-   **AI**: Google Gemini Pro API for trend analysis
-   **Styling**: Tailwind CSS + Shadcn UI
-   **State**: Zustand
            `
        },
        {
            id: "cyber-portfolio",
            title: "Cyber Portfolio",
            category: "Personal Brand",
            description: "Experimental portfolio showcasing 'Vibe Coding' with advanced animations and immersive UI.",
            tags: ["React", "Framer Motion", "Tailwind", "Three.js"],
            liveUrl: "#",
            codeUrl: "#",
            content: `
# Cyber Portfolio

This very website! A playground for advanced frontend techniques.

## Design Philosophy
"Vibe Coding" is about feeling. It's not just about information density; it's about the experience of consumption. We used glassmorphism, neon accents, and fluid motion to create a "Cyberse" aesthetic.

## Key Features
-   **Magnetic Buttons**: Physics-based interaction.
-   **Custom Cursor**: Context-aware cursor animations.
-   **Smooth Scrolling**: Lenis implementation for fluid navigation.
            `
        },
        {
            id: "ecodash",
            title: "EcoDash",
            category: "SaaS Dashboard",
            description: "Conceptual sustainability metrics dashboard designed for modern enterprise monitoring.",
            tags: ["Vue.js", "D3.js", "Firebase", "Nuxt"],
            liveUrl: "#",
            codeUrl: "#",
            content: `
# EcoDash

A dashboard for the green future.

## Capabilities
-   Real-time energy consumption tracking.
-   Carbon footprint calculation algorithms.
-   Department-wise breakdown of resource usage.

## Visualization
We utilized D3.js for complex, interactive data storytelling, allowing facility managers to drill down from a global view to a specific room's sensor data.
            `
        }
    ] as Project[]
};
