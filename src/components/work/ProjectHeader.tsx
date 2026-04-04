import { Project } from '@/data/profile';
import { ExternalLink, Github } from 'lucide-react';

interface Props {
    project: Project;
}

export function ProjectHeader({ project }: Props) {
    return (
        <header>
            <div className="flex gap-2 mb-6">
                <span className="text-xs font-bold text-purple-400 tracking-widest uppercase py-1 px-3 rounded-full bg-purple-400/10 border border-purple-400/20">
                    {project.category}
                </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
                {project.title}
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <ExternalLink size={20} /> Live Demo
                </a>
                <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <Github size={20} /> Source Code
                </a>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-sm text-white/80">{tag}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Role</h4>
                    <p className="text-sm text-white/80">Lead Developer & Designer</p>
                </div>
            </div>
        </header>
    );
}
