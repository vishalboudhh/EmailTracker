export default function ResumeCard({ resume, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow p-5 space-y-3">
      <h2 className="font-semibold text-lg">
        {resume.title || "Untitled Resume"}
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-3">
        <a
          href={resume.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded dark:bg-blue-900/30 dark:text-blue-300"
        >
          View
        </a>

        <button
          onClick={() => onDelete(resume._id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded dark:bg-red-900/30 dark:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
