export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    liveUrl: string;
    codeUrl: string;
    image?: string;
    video?: string;
    gallery?: string[];
    content: string; // Markdown content for the details page
}

export const profile = {
    name: "Rakibul Hasan Shuvo",
    role: "Creative Technologist & Digital Architect",
    location: "Bangladesh",
    email: "m.rakibul.h45@gmail.com",
    resumeUrl: "/resume.pdf",
    avatarUrl: "/rakibul.jpeg",

    // Social Links
    social: {
        linkedin: "https://www.linkedin.com/in/muhammad-rakibul-hasan-shuvo-5783363a0",
        github: "https://github.com/rakibulhasanshuvo",
        twitter: "https://twitter.com/",
        fiverr: "https://www.fiverr.com/hasan_shuvo_45",
        upwork: "https://www.upwork.com/freelancers/~01be148467895f438a",
        instagram: "#"
    },

    // Hero Section
    hero: {
        tagline: "Designing immersive digital experiences through the lens of aesthetic precision and technical excellence.",
        skills: [
            "Creative Engineering", "Visual Design", "Motion Systems", "Next.js Architecture", "TypeScript", "Cyber Intelligence"
        ]
    },

    // About Section
    about: {
        title: "Merging Visionary Design with Engineering Excellence",
        description: [
            "I am Rakibul Hasan Shuvo, a digital craftsman dedicated to building premium web experiences that resonate. My approach sits at the intersection of sophisticated design and high-performance engineering.",
            "Driven by a philosophy of 'Vibe Coding,' I transform abstract concepts into tangible digital products—ranging from high-fidelity interfaces to complex, scalable web ecosystems.",
            "Outside the editor, I explore the frontiers of cybersecurity and motion art, always seeking the perfect balance between security, functionality, and visual storytelling."
        ],
        stats: [
            { label: "Years of Craft", value: "3+" },
            { label: "Bespoke Projects", value: "20+" },
            { label: "Global Collaborations", value: "15+" }
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
            icon: "Code2",
            title: "Digital Engineering",
            description: "Architecting robust, performance-optimized applications using modern frameworks and scalable patterns."
        },
        {
            icon: "Palette",
            title: "Creative Design",
            description: "Crafting bespoke visual identities and high-fidelity user interfaces that prioritize both form and function."
        },
        {
            icon: "TrendingUp",
            title: "Strategic Growth",
            description: "Leveraging data-driven insights and SEO optimization to ensure your digital presence achieves maximum impact."
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

    // Workflow Section
    workflow: [
        {
            title: "Strategic Discovery",
            description: "We begin by dissecting your objectives, audience, and market landscape to build a bulletproof foundation."
        },
        {
            title: "Architectural Planning",
            description: "Designing a comprehensive roadmap that harmonizes technical feasibility with ambitious business goals."
        },
        {
            title: "Bespoke Design",
            description: "Engineering immersive visual languages and interactive prototypes that elevate your brand narrative."
        },
        {
            title: "Precision Development",
            description: "Bringing the vision to life with clean, performant code, maintaining absolute transparency throughout the build."
        },
        {
            title: "Seamless Launch",
            description: "Meticulous quality assurance followed by a strategic rollout and continuous post-launch optimization."
        }
    ],

    // Experience Section
    experience: [
        {
            year: "2023 - Present",
            role: "Independent Creative Developer",
            company: "Global Clientele",
            description: "Delivering high-end digital solutions for international brands, specializing in immersive Next.js experiences."
        },
        {
            year: "2022 - 2023",
            role: "Senior Frontend Engineer",
            company: "Tech Solutions Ltd.",
            description: "Architecting complex web systems and leading frontend initiatives for enterprise-level applications."
        },
        {
            year: "2021 - 2022",
            role: "Experience Designer",
            company: "Creative Studio",
            description: "Pioneering user-centric design strategies and crafting intuitive interfaces for high-growth startups."
        }
    ],

    // FAQ Section
    faqs: [
        {
            question: "What is the typical timeline for a bespoke project?",
            answer: "Most engagements span between 4 to 10 weeks, ensuring ample time for deep discovery, precision design, and robust engineering."
        },
        {
            question: "Do you provide ongoing technical partnership?",
            answer: "Yes, I offer dedicated support and optimization phases post-launch to ensure your product continues to evolve and perform."
        },
        {
            question: "How do you approach project pricing?",
            answer: "Projects are typically value-priced based on scope and complexity, though I offer flexible arrangements for long-term collaborations."
        },
        {
            question: "Can you assist with scaling existing platforms?",
            answer: "Absolutely. I specialize in performance audits, UI/UX modernization, and implementing scalable frontend architectures for established apps."
        }
    ],

    // Contact Section
    contact: {
        heading: "Let's Build Something Extraordinary",
        subheading: "Ready to elevate your digital presence? Let's start a conversation."
    },

    // Projects Section
    projects: [
        {
            id: "nexus-os",
            title: "Nexus OS",
            category: "Platform",
            description: "A sophisticated web-based operating system. Orchestrating complex window management and system-level interactions in the browser.",
            tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
            liveUrl: "#",
            codeUrl: "#",
            image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=1600",
            gallery: [
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
            ],
            content: `
# Nexus OS

Nexus OS is an experimental project that pushes the boundaries of what's possible with web technologies.

## Features
-   **Window Management**: Drag, resize, and minimize windows just like a real desktop.
-   **Terminal Emulator**: A functional terminal with basic Unix commands.
-   **App Ecosystem**: Includes a calculator, notepad, and file explorer.

## The Challenge
Implementing a robust window management system in React required deep knowledge of the DOM and state management. I used Framer Motion for the fluid animations and a custom hook system for managing window focus and layering.
            `
        },
        {
            id: "stockniche-ai",
            title: "StockNiche AI",
            category: "Intelligence",
            description: "AI-driven market analysis platform for digital assets. Real-time trend forecasting powered by Google Gemini.",
            tags: ["React", "Gemini API", "Tailwind", "Next.js"],
            liveUrl: "#",
            codeUrl: "#",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
            video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-server-room-42880-large.mp4",
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
            category: "Experimental",
            description: "A showcase of high-end frontend craftsmanship. Immersive UI, fluid motion, and boutique aesthetics.",
            tags: ["React", "Framer Motion", "Tailwind", "Three.js"],
            liveUrl: "#",
            codeUrl: "#",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1600",
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
            category: "Enterprise",
            description: "Sustainability metrics dashboard for modern infrastructure. Interactive data storytelling with D3.js.",
            tags: ["Vue.js", "D3.js", "Firebase", "Nuxt"],
            liveUrl: "#",
            codeUrl: "#",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
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
