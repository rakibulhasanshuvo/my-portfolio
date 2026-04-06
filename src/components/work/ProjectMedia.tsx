import { Project } from '@/data/profile';
import Image from 'next/image';

interface Props {
    project: Project;
}

export function ProjectMedia({ project }: Props) {
    return (
        <>
            {project.video ? (
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <video
                        src={project.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : project.image ? (
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : null}
        </>
    );
}
