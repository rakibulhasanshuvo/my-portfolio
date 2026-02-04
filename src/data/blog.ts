export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    content: string; // Markdown
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Rise of Vibe Coding",
        excerpt: "Why feeling matters more than function in 2024 web design.",
        date: "Feb 04, 2026",
        readTime: "5 min read",
        slug: "rise-of-vibe-coding",
        content: `
# The Rise of Vibe Coding

Web design is circular. We went from chaotic personalization (GeoCities) to rigid structure (Bootstrap) to flat minimalism. Now, we're entering the **Vibe Era**.

## What is Vibe Coding?
It's an approach where the *emotional response* to an interface is treated as a first-class citizen, equal to usability.

## Why now?
AI can write functional code. But AI (currently) struggles to understand "cool". That's the human edge.

### Core Principles
1.  **Motion is Meaning**: Things shouldn't just appear; they should arrive.
2.  **Depth**: Use light, shadow, and blur to create virtual space.
3.  **Surprise**: Micro-interactions that delight the user.
        `
    },
    {
        id: "2",
        title: "Mastering Framer Motion",
        excerpt: "A deep dive into complex gesture handling in React.",
        date: "Jan 20, 2026",
        readTime: "8 min read",
        slug: "mastering-framer-motion",
        content: `
# Mastering Framer Motion

Framer Motion is the de-facto animation library for React. Here is how to use it effectively.

## layoutId is Magic
The \`layoutId\` prop allows components to morphed between different parts of the DOM tree. It's how you build "hero" animations where a card expands to fill the screen.

## Gestures
Don't just click. Drag. Hover. Long press.
\`\`\`jsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0 }}
  whileDrag={{ scale: 1.1 }}
/>
\`\`\`
        `
    }
];
