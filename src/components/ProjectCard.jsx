import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-44 w-full bg-gray-100">
        <img src={project.coverImage || "/placeholder-16x9.png"} alt={project.title}
             className="w-full h-full object-cover"/>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-sm text-slate-500 mt-2">{project.summary}</p>
        <div className="mt-4">
          <Link to={`/projects/${project._id}`} className="text-blue-600 hover:underline">View case study →</Link>
        </div>
      </div>
    </article>
  );
}