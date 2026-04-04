import { Project } from '@/data/profile';
import { ShareButtons } from '@/components/work/ShareButtons';

interface Props {
    project: Project;
}

export function ProjectContent({ project }: Props) {
    return (
        <div className="pt-12 border-t border-white/10">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Share this project</h4>
            <ShareButtons title={project.title} />
        </div>
    );
}
