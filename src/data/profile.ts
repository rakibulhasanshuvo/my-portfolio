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

    // Workflow Section
    workflow: [
        {
            title: "Discovery",
            description: "We start by diving deep into your goals, audience, and vision to establish a solid foundation."
        },
        {
            title: "Strategy",
            description: "Developing a roadmap that aligns your business objectives with technical and design requirements."
        },
        {
            title: "Design",
            description: "Creating high-fidelity visuals and interactive prototypes that bring your brand to life."
        },
        {
            title: "Development",
            description: "Building your project with clean, performant code while keeping you updated every step of the way."
        },
        {
            title: "Launch",
            description: "Rigorous testing followed by a smooth rollout and post-launch support to ensure success."
        }
    ],

    // Experience Section
    experience: [
        {
            year: "2023 - Present",
            role: "Freelance Creative Developer",
            company: "Self-Employed",
            description: "Delivering high-end digital solutions for international clients, focusing on React and Next.js."
        },
        {
            year: "2022 - 2023",
            role: "Frontend Developer",
            company: "Tech Solutions Ltd.",
            description: "Collaborated with cross-functional teams to build complex web applications and internal tools."
        },
        {
            year: "2021 - 2022",
            role: "UI Designer",
            company: "Creative Studio",
            description: "Focused on user-centric design, creating intuitive interfaces for mobile and web platforms."
        }
    ],

    // FAQ Section
    faqs: [
        {
            question: "How long does a typical project take?",
            answer: "Most projects take between 4 to 8 weeks, depending on the complexity and scope of the work."
        },
        {
            question: "Do you offer post-launch support?",
            answer: "Yes, I provide 30 days of free support after launch to ensure everything is running smoothly."
        },
        {
            question: "What is your pricing model?",
            answer: "I usually work with fixed-price project quotes, but I'm also open to hourly arrangements for ongoing work."
        },
        {
            question: "Can you help with existing projects?",
            answer: "Absolutely! I can help with feature additions, performance optimization, or UI/UX audits for existing apps."
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
            id: "nexus-os",
            title: "Nexus OS",
            category: "Web",
            description: "A fully functional web-based operating system built with React and Tailwind CSS. Featuring window management, terminal, and apps.",
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
            category: "AI",
            description: "Intelligent market analysis platform for Adobe Stock contributors. Features live trend analysis using Google Gemini API.",
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
            category: "Web",
            description: "Experimental portfolio showcasing 'Vibe Coding' with advanced animations and immersive UI.",
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
            category: "Design",
            description: "Conceptual sustainability metrics dashboard designed for modern enterprise monitoring.",
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
