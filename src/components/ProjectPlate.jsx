import Image from "next/image";

// Project art on a carbon plate. Logos are centred; screenshots anchor to the top.
export default function ProjectPlate({ project, sizes, priority = false, className = "aspect-[16/10]" }) {
  const src = project.logo ?? project.image;
  return (
    <div className={`relative overflow-hidden rounded-md bg-carbon ${className}`}>
      <Image
        src={src}
        alt={`${project.title} ${project.logo ? "logo" : "screenshot"}`}
        fill
        sizes={sizes}
        priority={priority}
        className={project.logo ? "object-cover" : "object-cover object-top"}
      />
    </div>
  );
}
