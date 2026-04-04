import { Project } from '@/data/profile';
import Image from 'next/image';

interface Props {
    project: Project;
}

export function ProjectGallery({ project }: Props) {
    if (!project.gallery) return null;

    return (
        <div className="grid grid-cols-2 gap-4">
            {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                    <Image
                        src={img}
                        alt={`${project.title} gallery ${i}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            ))}
        </div>
    );
}
