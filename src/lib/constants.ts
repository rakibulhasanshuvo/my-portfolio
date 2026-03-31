import { profile } from '@/data/profile';

// Hero Section Constants
export const skills = profile.hero.skills;
export const duplicatedSkills = [...skills, ...skills, ...skills];

// TechStack Section Constants
export const technologies = profile.techStack;
export const firstRowTechnologies = [...technologies, ...technologies, ...technologies];
const reversedTech = [...technologies].reverse();
export const secondRowTechnologies = [...reversedTech, ...reversedTech, ...reversedTech];

import { blogPosts } from '@/data/blog';

// Lookups Maps for O(1) Access
export const projectMap = Object.fromEntries(profile.projects.map(p => [p.id, p]));
export const blogPostMap = Object.fromEntries(blogPosts.map(p => [p.slug, p]));
