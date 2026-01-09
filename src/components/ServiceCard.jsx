export default function ServiceCard({ title, desc, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-start gap-4">
        <div className="bg-blue-50 rounded p-3 inline-flex">{icon}</div>
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-slate-600 mt-2">{desc}</p>
        </div>
      </div>
    </div>
  );
}